var recast = require('recast');
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;

/**
 * Visits an AST looking default params. This is intended to be used with the
 * ast-types `visit()` function.
 *
 * @private
 */
function Visitor() {
  types.PathVisitor.call(this);
}
Visitor.prototype = Object.create(types.PathVisitor.prototype);
Visitor.prototype.constructor = Visitor;

/**
 * Visits functions looking for default params, replacing them with assignment
 * expressions as appropriate.
 *
 * @param {Path} path
 */
Visitor.prototype.visitFunction = function(path) {
  var node = path.node;
  var defaults = node.defaults;
  var params = node.params;
  var assignments = [];

  if (defaults && defaults.length > 0) {
    defaults.forEach(function (defaultExpression, i) {
      if (defaultExpression) {
        var param = params[i];
        var argumentExpression = b.memberExpression(
          b.identifier('arguments'),
          b.literal(i),
          true
        );

        // var a = (arguments[0] !== void 0 ? arguments[0] : someDefault);
        assignments.push(b.variableDeclaration(
          'var',
          [b.variableDeclarator(
            param,
            b.conditionalExpression(
              b.binaryExpression(
                '!==',
                argumentExpression,
                b.unaryExpression('void', b.literal(0))
              ),
              argumentExpression,
              defaultExpression
            )
          )]
        ));
      }
    });

    node.params = node.params.slice(0, node.params.length - assignments.length);
    node.defaults = [];
    node.body.body.unshift.apply(node.body.body, assignments);
  }

  this.traverse(path);
};

Visitor.visitor = new Visitor();
module.exports = Visitor;
