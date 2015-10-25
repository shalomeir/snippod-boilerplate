/* jshint node:true, undef:true, unused:true */

var recast = require('recast');
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;

var util = require('ast-util');

/**
 * Visits nodes in an AST looking for spread elements. This is intended to be
 * used with recast's `visit()` function.
 *
 * @private
 * @constructor
 * @extends {types.PathVisitor}
 */
function Visitor() {
  types.PathVisitor.call(this);
}

Visitor.prototype = Object.create(types.PathVisitor.prototype);
Visitor.prototype.constructor = Visitor;

/**
 * Replaces call expressions using spread elements with an ES5 equivalent.
 *
 * @param {NodePath} path
 * @return {?CallExpression}
 */
Visitor.prototype.visitCallExpression = function(path) {
  var node = path.node;

  if (node.arguments.some(n.SpreadElement.check)) {
    var context;
    var callee = node.callee;

    if (n.MemberExpression.check(callee)) {
      if (n.ThisExpression.check(callee.object)) {
        // foo.bar(...a), safe to use `foo` as context
        context = callee.object;
      } else {
        // var $__0;
        context = util.uniqueIdentifier(path.scope);
        util.injectVariable(path.scope, context);

        // ($__0 = foo()).bar(...a)
        callee = b.memberExpression(
          b.assignmentExpression(
            '=',
            context,
            callee.object
          ),
          callee.property,
          callee.computed
        );
      }
    } else {
      context = b.literal(null);
    }

    // foo(1, ...a) -> foo.apply(null, [1].concat(a))
    return b.callExpression(
      b.memberExpression(
        callee,
        b.identifier('apply'),
        false
      ),
      [context, this.buildConcatExpression(path.scope, node.arguments)]
    );
  }

  this.traverse(path);
};

/**
 * Replaces array expressions using spread elements with an ES5 equivalent.
 *
 * @param {NodePath} path
 * @return {Expression}
 */
Visitor.prototype.visitArrayExpression = function(path) {
  var node = path.node;

  if (node.elements.some(n.SpreadElement.check)) {
    // [1, ...a] -> [1].concat(a)
    return this.buildConcatExpression(path.scope, node.elements);
  }

  this.traverse(path);
};

/**
 * Replaces new expressions using spread elements with an ES5 equivalent.
 *
 * @param {NodePath} path
 * @returns {NewExpression}
 */
Visitor.prototype.visitNewExpression = function(path) {
  var node = path.node;

  if (node.arguments.some(n.SpreadElement.check)) {
    // new Foo(...a) -> new (Function.prototype.bind.apply(Foo, [null].concat(a))()
    return b.newExpression(
      util.callFunctionBind(
        path.scope.getGlobalScope(),
        node.callee,
        b.literal(null),
        this.buildConcatExpression(path.scope, node.arguments)
      ),
      []
    );
  }

  this.traverse(path);
};

/**
 * Builds an expression of arrays concatenated together by grouping segments
 * around `SpreadElement`s and treating `SpreadElement`s as arrays.
 *
 * @private
 * @param {Scope} scope
 * @param {Array.<Expression>} elements
 * @return {Expression}
 */
Visitor.prototype.buildConcatExpression = function(scope, elements) {
  // 1, 2, ...a, 3 -> [1, 2], a, [3]
  var arrays = [];
  var remainder;

  elements.forEach(function(element) {
    if (n.SpreadElement.check(element)) {
      if (remainder) {
        arrays.push(b.arrayExpression(remainder));
        remainder = null;
      }
      arrays.push(
        accumulateIteratorValues(
          scope.getGlobalScope(),
          util.callGetIterator(scope.getGlobalScope(), element.argument)
        )
      );
    } else {
      if (!remainder) { remainder = []; }
      remainder.push(element);
    }
  });

  if (remainder) {
    arrays.push(b.arrayExpression(remainder));
    remainder = null;
  }

  // [1, 2], a, [3] -> [1, 2].concat(a, [3])
  var first = arrays.shift();

  if (arrays.length === 0) {
    return first;
  }

  return b.callExpression(
    b.memberExpression(
      first,
      b.identifier('concat'),
      false
    ),
    arrays
  );
};

/**
 * var accumulateIteratorValues = function(iterator) {
 *   var result = [];
 *   for (var $__0 = iterator, $__1; !($__1 = $__0.next()).done; ) {
 *     result.push($__1.value);
 *   }
 *   return result;
 * };
 *
 * @private
 * @param {Scope} scope
 * @param {Expression} iterator
 */
function accumulateIteratorValues(scope, iterator) {
  var accumulate = util.injectShared(
    scope,
    'accumulateIteratorValues',
    function() {
      var iteratorId = b.identifier('iterator');
      var nextId = b.identifier('next');
      var resultId = b.identifier('result');
      var itemId = b.identifier('item');
      var doneId = b.identifier('done');
      var valueId = b.identifier('value');

      return b.functionExpression(
        null,
        [iteratorId],
        b.blockStatement([
          b.variableDeclaration(
            'var',
            [b.variableDeclarator(
              resultId,
              b.arrayExpression([])
            )]
          ),
          b.forStatement(
            b.variableDeclaration(
              'var',
              [b.variableDeclarator(itemId, null)]
            ),
            b.unaryExpression(
              '!',
              b.memberExpression(
                b.assignmentExpression(
                  '=',
                  itemId,
                  b.callExpression(
                    b.memberExpression(
                      iteratorId,
                      nextId,
                      false
                    ),
                    []
                  )
                ),
                doneId,
                false
              )
            ),
            null,
            b.expressionStatement(b.callExpression(
              b.memberExpression(
                resultId,
                b.identifier('push'),
                false
              ),
              [b.memberExpression(
                itemId,
                valueId,
                false
              )]
            ))
          ),
          b.returnStatement(resultId)
        ])
      );
    }
  );

  return b.callExpression(
    accumulate,
    [iterator]
  );
}

Visitor.visitor = new Visitor();
module.exports = Visitor;
