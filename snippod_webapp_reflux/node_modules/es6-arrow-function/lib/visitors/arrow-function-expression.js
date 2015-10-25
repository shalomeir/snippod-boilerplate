var assert = require('assert');
var through = require('through');
var recast = require('recast');
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;
var PathVisitor = types.PathVisitor;
var ThisExpressionVisitor = require('./this-expression');
var util = require('ast-util');

/**
 * Visits a node of an AST looking for arrow function expressions. This is
 * intended to be used with the ast-types `visit()` function.
 *
 * @constructor
 * @extends PathVisitor
 */
function ArrowFunctionExpressionVisitor() {
  PathVisitor.call(this);
}

ArrowFunctionExpressionVisitor.prototype = Object.create(PathVisitor.prototype);
ArrowFunctionExpressionVisitor.prototype.constructor = ArrowFunctionExpressionVisitor;

/**
 * Visits arrow function expressions and replaces them with normal functions.
 *
 * @param {NodePath} path
 * @return {?Node}
 */
ArrowFunctionExpressionVisitor.prototype.visitArrowFunctionExpression = function(path) {
  // Descend into the body using a specific visitor
  this.traverse(path, BodyVisitor.visitor);

  var node = path.node;
  var hasThisExpression = ThisExpressionVisitor.hasThisExpression(node);

  // In the future, ArrowFunctionExpression and FunctionExpression nodes may
  // get new fields (like .async) that we can't anticipate yet, so we simply
  // switch the type and let all the other fields carry over.
  node.type = 'FunctionExpression';

  if (node.expression) {
    node.expression = false;
    node.body = b.blockStatement([b.returnStatement(node.body)]);
  }

  if (hasThisExpression) {
    return b.callExpression(
      b.memberExpression(node, b.identifier('bind'), false),
      [b.thisExpression()]
    );
  }
};

/**
 * Visits the body of an arrow function expressions.
 *
 * @constructor
 * @private
 * @extends PathVisitor
 */
function BodyVisitor() {
  PathVisitor.call(this);
}

BodyVisitor.prototype = Object.create(ArrowFunctionExpressionVisitor.prototype);
BodyVisitor.prototype.constructor = ArrowFunctionExpressionVisitor;

/**
 * Body visitor traverses arrow function bodies with itself.
 *
 * @returns {BodyVisitor}
 */
BodyVisitor.prototype.getBodyVisitor = function() {
  return this;
};

/**
 * Ensures that `arguments` directly contained in arrow functions is hoisted.
 *
 * @param {NodePath} path
 * @return {?Node|boolean}
 */
BodyVisitor.prototype.visitIdentifier = function(path) {
  var node = path.node;

  if (node.name === 'arguments' && util.isReference(path)) {
    var functionScope = this.associatedFunctionScope(path);
    if (functionScope) {
      return util.sharedFor(functionScope, node.name);
    }
  }

  return false;  // nothing else to look at here
};

/**
 * @private
 * @param {NodePath} path
 * @return {?Scope} The nearest non-arrow function scope above `path`.
 */
BodyVisitor.prototype.associatedFunctionScope = function(path) {
  var scope = path.scope;
  while (scope && n.ArrowFunctionExpression.check(scope.path.node)) {
    scope = scope.parent;
  }
  return scope;
};

BodyVisitor.visitor = new BodyVisitor();
ArrowFunctionExpressionVisitor.visitor = new ArrowFunctionExpressionVisitor();
module.exports = ArrowFunctionExpressionVisitor;
