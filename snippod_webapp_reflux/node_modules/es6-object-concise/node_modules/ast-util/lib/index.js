/* jshint node:true, undef:true, unused:true */

var types = require('ast-types');
var b = types.builders;
var n = types.namedTypes;
var NodePath = types.NodePath;

var getSecret = require('private').makeAccessor();
var hasOwnProp = Object.prototype.hasOwnProperty;

var assert = require('assert');

/**
 * Re-export ast-types for ease of our users.
 */
exports.types = types;

/**
 * Export the Replacement helper for anything that needs to delay replacement.
 */
exports.Replacement = require('./replacement');

/**
 * Returns a call to `Array.prototype.slice` with `node` as the context and
 * `begin` and `end` as the arguments to `slice`.
 *
 * @param {Scope} scope
 * @param {Expression} node
 * @param {Expression|number=} begin
 * @param {Expression|number=} end
 * @return {CallExpression}
 */
function callArraySlice(scope, node, begin, end) {
  if (typeof begin === 'number') {
    begin = b.literal(begin);
  }

  if (typeof end === 'number') {
    end = b.literal(end);
  }

  var args = [];
  if (begin) { args.push(begin); }
  if (end) { args.push(end); }

  return callSharedMethodWithContext(
    scope,
    'Array.prototype.slice',
    node,
    args
  );
}
exports.callArraySlice = callArraySlice;

/**
 * Returns a call to `Function.prototype.bind` using either `call` or `apply`
 * depending on what the value of `args` is. If `args` is an expression then
 * `apply` is used. If `args` is an array of expressions, then `call`.
 *
 * @param {Scope} scope
 * @param {Expression} fn
 * @param {Expression} context
 * @param {Expression|Array.<Expression>} args
 * @return {CallExpression}
 */
function callFunctionBind(scope, fn, context, args) {
  var bind = sharedFor(scope, 'Function.prototype.bind');

  if (n.Expression.check(args)) {
    return b.callExpression(
      b.memberExpression(bind, b.identifier('apply'), false),
      [fn, b.callExpression(
        b.memberExpression(
          b.arrayExpression([context]),
          b.identifier('concat'),
          false
        ),
        [args]
      )]
    );
  } else {
    return b.callExpression(
      b.memberExpression(bind, b.identifier('call'), false),
      [fn, context].concat(args || [])
    );
  }
}
exports.callFunctionBind = callFunctionBind;

/**
 * Gets an iterator for the value representing the given expression.
 *
 * @param {Scope} scope
 * @param {Expression} expression
 * @return {CallExpression}
 */
function callGetIterator(scope, expression) {
  var getIterator = injectGetIteratorHelper(scope.getGlobalScope());
  return b.callExpression(getIterator, [expression]);
}
exports.callGetIterator = callGetIterator;

/**
 * Returns a reference to a shared function that implements the default
 * `@@iterator` for arrays.
 *
 * @private
 * @param {Scope} scope
 * @return {CallExpression}
 */
function getArrayIterator(scope) {
  return injectGetArrayIteratorHelper(scope.getGlobalScope());
}
exports.getArrayIterator = getArrayIterator;

/**
 * return a range of value from an iterator
 *
 * @param {Scope} scope
 * @param {Expression} iterator
 * @param {Literal} index
 * @param {Literal} begin
 * @param {Literal} len
 * @return {CallExpression}
 */
function callGetIteratorRange(scope, iterator, index, begin, len) {
  var getIteratorRange = injectGetIteratorRangeHelper(scope.getGlobalScope());
  return b.callExpression(getIteratorRange, [iterator, index, begin, len]);
}
exports.callGetIteratorRange = callGetIteratorRange;

/**
 * The [[Get]] internal method on objects.
 *
 * @param {Scope} scope
 * @param {Expression} object
 * @param {Expression} property
 * @param {Expression} receiver
 * @return {CallExpression}
 */
function callGet(scope, object, property, receiver) {
  var get = injectGetHelper(scope.getGlobalScope());
  return b.callExpression(get, [object, property, receiver]);
}
exports.callGet = callGet;

/**
 * Returns a call to `Object.getOwnPropertyDescriptor` with the given `object`
 * and `property`.
 *
 * @param {Scope} scope
 * @param {Expression} object
 * @param {Expression|string} property
 * @return {CallExpression}
 */
function callGetOwnPropertyDescriptor(scope, object, property) {
  if (typeof property === 'string') {
    property = b.literal(property);
  }

  return callSharedMethod(
    scope,
    'Object.getOwnPropertyDescriptor',
    [object, property]
  );
}
exports.callGetOwnPropertyDescriptor = callGetOwnPropertyDescriptor;

/**
 * Returns a call to `Object.getPrototypeOf` with the given `object`.
 *
 * @param {Scope} scope
 * @param {Expression} object
 * @return {CallExpression}
 */
function callGetPrototypeOf(scope, object) {
  return callSharedMethod(scope, 'Object.getPrototypeOf', [object]);
}
exports.callGetPrototypeOf = callGetPrototypeOf;

/**
 * Returns a call to `hasOwnProperty` with `node` as the context and `property`
 * as the property to check.
 *
 * @param {Scope} scope
 * @param {Expression} node
 * @param {Expression|string} property
 * @return {CallExpression}
 */
function callHasOwnProperty(scope, node, property) {
  if (typeof property === 'string') {
    property = b.literal(property);
  }

  return callSharedMethodWithContext(
    scope,
    'Object.prototype.hasOwnProperty',
    node,
    [property]
  );
}
exports.callHasOwnProperty = callHasOwnProperty;

/**
 * Returns a call to the given `callee` with `args` as the arguments. If
 * `callee` is a string then it is treated as a globally-accessible function
 * such as `Object.defineProperty` which will be stored in a unique temporary
 * variable. Subsequent calls to this function will re-use the same temporary
 * variable.
 *
 * @param {Scope} scope
 * @param {Expression|string} callee
 * @param {Array.<Expression>} args
 * @return {CallExpression}
 */
function callSharedMethod(scope, callee, args) {
  if (typeof callee === 'string') {
    callee = sharedFor(scope, callee);
  }

  return b.callExpression(callee, args);
}
exports.callSharedMethod = callSharedMethod;

/**
 * Returns a call to the given `callee` with `context` as the method context
 * and `args` as the arguments. If `callee` is a string then it is treated as a
 * globally-accessible function such as `Array.prototype.slice` which will be
 * stored in a unique temporary variable. Subsequent calls to this function
 * will re-use the same temporary variable.
 *
 * @param {Scope} scope
 * @param {Expression|string} callee
 * @param {Expression} context
 * @param {Array.<Expression>} args
 * @return {CallExpression}
 */
function callSharedMethodWithContext(scope, callee, context, args) {
  if (typeof callee === 'string') {
    callee = sharedFor(scope, callee);
  }

  return b.callExpression(
    b.memberExpression(callee, b.identifier('call'), false),
    [context].concat(args)
  );
}
exports.callSharedMethodWithContext = callSharedMethodWithContext;

/**
 * Gets a list of identifiers referencing global variables anywhere within the
 * given `ast`. Assuming the ast is for this code:
 *
 *   var a;
 *   function b(){ return c; }
 *   b(d);
 *
 * Then `getGlobals` will return two identifiers, `c` and `d`.
 *
 * @param {Node} ast
 * @return {Array.<Identifier>}
 */
function getGlobals(ast) {
  var globals = [];
  var seen = Object.create(null);

  types.visit(ast, {
    visitNode: function(path) {
      this.traverse(path);
      var node = path.value;

      if (isReference(path) && !path.scope.lookup(node.name)) {
        if (!(node.name in seen)) {
          seen[node.name] = true;
          globals.push(node);
        }
      }
    }
  });

  return globals;
}
exports.getGlobals = getGlobals;

/**
 * Generate a safe JavaScript identifier for the given string.
 *
 * @param {string} string
 * @return {string}
 * @private
 */
function identifierForString(string) {
  // TODO: Verify this regex.
  return string.replace(/[^\w\d\$_]/g, '$');
}

/**
 * Injects the 'get' pre-built helper.
 *
 * @param {Scope} scope
 * @return {Identifier}
 */
function injectGetHelper(scope) {
  return injectShared(
    scope,
    'get',
    function() {
      return require('./helpers/get')(scope);
    }
  );
}

/**
 * Injects the 'getArrayIterator' pre-built helper.
 *
 * @param {Scope} scope
 * @return {Identifier}
 */
function injectGetArrayIteratorHelper(scope) {
  return injectShared(
    scope,
    'getArrayIterator',
    function() {
      return require('./helpers/getArrayIterator')(scope);
    }
  );
}

/**
 * Injects the 'getIterator' pre-built helper.
 *
 * @param {Scope} scope
 * @return {Identifier}
 */
function injectGetIteratorHelper(scope) {
  return injectShared(
    scope,
    'getIterator',
    function() {
      return require('./helpers/getIterator')(scope);
    }
  );
}

/**
 * Injects the 'getIteratorRange' pre-built helper.
 *
 * @param {Scope} scope
 * @return {Identifier}
 */
function injectGetIteratorRangeHelper(scope) {
  return injectShared(
    scope,
    'getIteratorRange',
    function() {
      return require('./helpers/getIteratorRange')(scope);
    }
  );
}

/**
 * Injects a shared variable with a unique identifier. Only the first call with
 * the same `scope` and `name` will result in a variable declaration being
 * created. The `expression` passed in can either be an AST node or a function
 * to generate one. This function is generally used to inject repeatedly-used
 * values and prevent repeated execution.
 *
 * @param {Scope} scope
 * @param {string} name
 * @param {Expression|function(): Expression} expression
 * @return {Identifier}
 */
function injectShared(scope, name, expression) {
  var scopeSecret = getSecret(scope);

  if (!(name in scopeSecret)) {
    scopeSecret[name] = injectVariable(
      scope,
      uniqueIdentifier(scope, name),
      typeof expression === 'function' ?
        expression() :
        expression
    );
  }

  return scopeSecret[name];
}
exports.injectShared = injectShared;

/**
 * Injects a variable with the given `identifier` into the given `scope` as a
 * `var` declaration with an optional initial value.
 *
 * @param {Scope} scope
 * @param {Identifier} identifier
 * @param {Expression=} init
 * @return {Identifier} Returns the given `identifier`.
 */
function injectVariable(scope, identifier, init) {
  var bodyPath = scope.path.get('body');

  if (n.BlockStatement.check(bodyPath.value)) {
    bodyPath = bodyPath.get('body');
  }

  var declarationIndex;
  var bodyStatements = bodyPath.node.body;

  for (declarationIndex = 0; declarationIndex < bodyStatements.length; declarationIndex++) {
    var statement = bodyStatements[declarationIndex];
    if (!isDirectivePrologue(statement)) {
      break;
    }
  }

  bodyPath.insertAt(
    declarationIndex,
    b.variableDeclaration(
      'var',
      [b.variableDeclarator(identifier, init || null)]
    )
  );

  // Ensure this identifier counts as used in this scope.
  var name = identifier.name;
  var bindings = scope.getBindings();
  if (!hasOwnProp.call(bindings, name)) {
    bindings[name] = [];
  }
  bindings[name].push(new NodePath(identifier));

  return identifier;
}
exports.injectVariable = injectVariable;

/**
 * Determines whether the given statement is a directive prologue, e.g.
 * "use strict".
 *
 * @param {Statement} statement
 * @returns {boolean}
 */
function isDirectivePrologue(statement) {
  if (n.ExpressionStatement.check(statement)) {
    var expression = statement.expression;
    if (n.Literal.check(expression)) {
      return typeof expression.value === 'string';
    }
  }

  return false;
}

/**
 * Determines whether the given `path` is a value reference. For example, `a`
 * and `b` are references, but `c` is not:
 *
 *    a(b.c);
 *
 * Only identifiers count as references.
 *
 * @param {NodePath} path
 * @param {string=} name
 * @return {boolean}
 */
function isReference(path, name) {
  var node = path.value;
  assert.ok(n.Node.check(node));

  if (n.Identifier.check(node)) {
    if (name && node.name !== name) { return false; }

    var parent = path.parent.value;
    if (n.VariableDeclarator.check(parent)) {
      return parent.init === node;
    } else if (n.MemberExpression.check(parent)) {
      return parent.object === node || (
        parent.computed && parent.property === node
      );
    } else if (n.Function.check(parent)) {
      return parent.id !== node && !parent.params.some(function(param) {
        return param === node;
      });
    } else if (n.ClassDeclaration.check(parent) || n.ClassExpression.check(parent)) {
      return parent.id !== node;
    } else if (n.CatchClause.check(parent)) {
      return parent.param !== node;
    } else if (n.Property.check(parent)) {
      return parent.key !== node;
    } else if (n.MethodDefinition.check(parent)) {
      return parent.key !== node;
    } else if (n.ImportSpecifier.check(parent)) {
      return false;
    } else if (n.ImportDefaultSpecifier.check(parent)) {
      return false;
    } else if (n.ImportNamespaceSpecifier.check(parent)) {
      return false;
    } else if (n.LabeledStatement.check(parent)) {
      return false;
    } else {
      return true;
    }
  }

  return false;
}
exports.isReference = isReference;

/**
 * Determines whether the given `name` should be considered "used" in the given
 * `scope`. For a name to be used, it should either:
 *
 *   1. Be declared in this scope or a parent scope.
 *   2. Be referenced in this scope, a parent scope, or any child scopes.
 *
 * For example, `a`, `b`, and `d` are used in the global scope of this example
 * while `c` is not:
 *
 *   var a;
 *   function b() {}
 *
 *   try {
 *     a = b(d);
 *   } catch (c) {
 *   }
 *
 * @param {Scope} scope
 * @param {string} name
 * @return {boolean}
 */
function isUsed(scope, name) {
  if (scope.lookup(name)) {
    return true;
  }

  var globalScope = scope.getGlobalScope();
  var globalScopeSecret = getSecret(globalScope);

  if (!globalScopeSecret.globals) {
    globalScopeSecret.globals = getGlobals(globalScope.node);
  }

  return globalScopeSecret.globals.some(function(global) {
    return global.name === name;
  });
}
exports.isUsed = isUsed;

/**
 * Injects a shared variable by getting the named value from a dotted path. For
 * example, this will return an identifier that can be used in place of the
 * named expression:
 *
 *    sharedFor(scope, 'Object.defineProperty')
 *
 * Subsequent calls to `sharedFor` in the same scope will return the same
 * identifier.
 *
 * @param {Scope} scope
 * @param {string} name
 * @return {Identifier}
 */
function sharedFor(scope, name) {
  return injectShared(
    scope,
    name,
    function() {
      var parts = name.split('.');
      var result = b.identifier(parts[0]);

      for (var i = 1, length = parts.length; i < length; i++) {
        result = b.memberExpression(
          result,
          b.identifier(parts[i]),
          false
        );
      }

      return result;
    }
  );
}
exports.sharedFor = sharedFor;

/**
 * Generates an identifier guaranteed not to collide with any others in the
 * given `scope`. This function will also never generate the same identifier
 * twice for any `scope` whose global scope already got that identifier.
 *
 * Called in a scope with no global references and no variables, the first time
 * this function is called it will return an identifier named `$__0`.
 *
 * When called with a name that name will be used with a prefix, "$__", if
 * possible. If that name is already used then it will append incrementing
 * numbers until it finds a name that isn't used.
 *
 * @param {Scope} scope
 * @param {string=} name
 * @return {Identifier}
 * @see isUsed
 */
function uniqueIdentifier(scope, name) {
  var prefix = '$__' + identifierForString(name ? name : '');
  var globalScopeSecret = getSecret(scope.getGlobalScope());
  var n = globalScopeSecret.nextId || 0;
  var identifier = name ? prefix : null;

  while (!identifier || isUsed(scope, identifier)) {
    identifier = prefix + n;
    n++;
  }

  globalScopeSecret.nextId = n;

  return b.identifier(identifier);
}
exports.uniqueIdentifier = uniqueIdentifier;
