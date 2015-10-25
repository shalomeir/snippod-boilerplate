/* jshint undef:true, unused:true, node:true */

var assert = require('assert');
var through = require('through');

var util = require('ast-util');
var recast = require('recast');
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;
var isArray = types.builtInTypes.array;
var isObject = types.builtInTypes.object;
var NodePath = types.NodePath;

/**
 * Visits a node of an AST looking computed property. This is intended to be
 * used with the ast-types `traverse()` function.
 *
 * Example: var foo = {[x + y]: 10};
 *
 * Is transformed to:
 *
 * ES5 mode:
 *
 * var $__0;
 * var foo = ($__0 = {},
 *  Object.defineProperty($__0, x + y, {
 *    writable: true,
 *    enumerable: true,
 *    configurable: true,
 *    value: 10
 *  }),
 *  $__0);
 *
 *  ES3 mode:
 *
 *  var $__0;
 *  var foo = ($__0 = {},
 *   $__0[x + y] = 10,
 *   $__0
 *  );
 *
 * @private
 * @param {Object} node
 * @this {ast-types.Path}
 */
function visitNode(node) {
  if (!nodeIsObjectWithComputedProperty(node)) {
    return;
  }

  var objectVar = util.injectVariable(
    this.scope,
    util.uniqueIdentifier(this.scope)
  );

  var properties = node.properties.map(
    PropTransform[targetEsVersion].bind(this, objectVar)
  );

  this.replace(b.sequenceExpression([
    b.assignmentExpression(
      '=',
      objectVar,
      b.objectExpression([])
    )].concat(properties, objectVar)
  ));
}

function nodeIsObjectWithComputedProperty(node) {
  return n.ObjectExpression.check(node) &&
    node.properties.some(function(prop) {
      return prop.computed === true;
    });
}

// Descriptors used to define a property in ES5 mode.

var DEFAULT_VALUE_DESC = buildDefaultDescNode({
  enumerable: true,
  configurable: true,
  writable: true,
});

var DEFAULT_ACCESSOR_DESC = buildDefaultDescNode({
  enumerable: true,
  configurable: true,
});

function buildDefaultDescNode(desc) {
  var node = [];
  for (var attr in desc) {
    node.push(b.property('init', b.identifier(attr), b.literal(desc[attr])));
  }
  return node;
}

/**
 * Transforms a property based on the target ES version mode.
 */
var PropTransform = {
  // ES5 handling with Object.defineProperty to support
  // correct handling of inherited accessor properties.
  ES5: function(objectVar, prop) {
    var valueAttr;
    var isAccessor = PropTransform.isAccessor(prop);

    if (isAccessor) {
      valueAttr = b.property(
        'init',
        b.identifier(prop.kind),
        copyFunctionExpression(prop.value)
      );
    } else {
      valueAttr = b.property('init', b.identifier('value'), prop.value);
    }

    return util.callSharedMethod(
      this.scope.getGlobalScope(),
      'Object.defineProperty',
      [
        objectVar,
        PropTransform.getPropName(prop),
        // Property descriptor.
        b.objectExpression(
          [valueAttr].concat(
            isAccessor
              ? DEFAULT_ACCESSOR_DESC
              : DEFAULT_VALUE_DESC
          )
        )
      ]
    );
  },

  // Fallback to ES3 compilation via simple assignment.
  ES3: function(objectVar, prop) {
    if (PropTransform.isAccessor(prop)) {
      throw TypeError('ES3 mode does not support accessor properties.');
    }

    return b.assignmentExpression(
      '=',
      b.memberExpression(
        objectVar,
        PropTransform.getPropName(prop),
        true
      ),
      prop.value
    );
  },

  getPropName: function(prop) {
    return prop.computed || n.Literal.check(prop.key)
      ? prop.key
      : b.literal(prop.key.name);
  },

  isAccessor: function(prop) {
    return (prop.kind === 'get' || prop.kind === 'set');
  }
};

/**
 * Builds a function expression from an accessor, copying over the
 * properties that are not part of ast-types's build fields.
 *
 * @private
 * @param {ast-types.Node} fn
 * @return {ast-types.Node}
 */
function copyFunctionExpression(fn) {
  var result = b.functionExpression(
    fn.id,
    fn.params,
    fn.body,
    fn.generator,
    fn.expression
  );
  if ('async' in fn) {
    result.async = fn.async;
  }
  if ('defaults' in fn) {
    result.defaults = fn.defaults;
  }
  if ('rest' in fn) {
    result.rest = fn.rest;
  }
  return result;
}

var targetEsVersion;
function setTargetEsVersion(version) {
  targetEsVersion = version ? ('ES' + version) : 'ES5';
}

/**
 * Transform an Esprima AST generated from ES6 by replacing all objects with
 * computed properties with an equivalent approach in ES5/ES3.
 *
 * @param {Object} ast
 * @param {Object} transformOptions
 * @return {Object}
 */
function transform(ast, transformOptions) {
  transformOptions = transformOptions || {};

  setTargetEsVersion(transformOptions.es);

  // We need the post order traversing here
  // to consider first nested sub-objects.
  function postOrderTraverse(path) {
    assert.ok(path instanceof NodePath);
    var value = path.value;

    if (isArray.check(value)) {
      path.each(postOrderTraverse);
      return;
    }

    if (!isObject.check(value)) {
      return;
    }

    types.eachField(value, function(name, child) {
      var childPath = path.get(name);
      if (childPath.value !== child) {
        childPath.replace(child);
      }
      postOrderTraverse(childPath);
    });

    if (n.Node.check(value)) {
      visitNode.call(path, value, postOrderTraverse);
    }
  }

  if (ast instanceof NodePath) {
    postOrderTraverse(ast);
    return ast.value;
  }

  var rootPath = new NodePath({ root: ast });
  postOrderTraverse(rootPath.get("root"));
  return rootPath.value.root;
}

/**
 * Transform JavaScript written using ES6 by replacing all computed properties
 * of object literals to the equivalent ES5 or ES3 based on ES version.
 *
 * @param {string} source
 * @return {string}
 */
function compile(source, mapOptions, compileOptions) {
  mapOptions = mapOptions || {};
  compileOptions = compileOptions || {};

  var recastOptions = {
    sourceFileName: mapOptions.sourceFileName,
    sourceMapName: mapOptions.sourceMapName
  };


  var ast = recast.parse(source, recastOptions);
  return recast.print(transform(ast, compileOptions), recastOptions);
}

module.exports = function (runOptions) {
  runOptions = runOptions || {};
  var data = '';
  return through(write, end);

  function write (buf) { data += buf; }
  function end () {
      this.queue(module.exports.compile(data, {}, runOptions).code);
      this.queue(null);
  }
};

module.exports.compile = compile;
module.exports.transform = transform;
