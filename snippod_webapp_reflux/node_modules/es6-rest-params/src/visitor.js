var recast = require('recast');
var types = recast.types;
var PathVisitor = types.PathVisitor;
var b = recast.types.builders;

function Visitor() {
  PathVisitor.apply(this, arguments);
}
Visitor.prototype = Object.create(PathVisitor.prototype);
Visitor.prototype.constructor = Visitor;

Visitor.prototype.visitFunction = function(path) {
  var node = path.node;
  if (node.rest) {
    var numArgs = node.params.length;

    node.body.body.unshift(
      // var args = [].call(arguments, 1);
      b.variableDeclaration('var', [
        b.variableDeclarator(
          node.rest,
          b.callExpression(
            b.memberExpression(
              b.memberExpression(
                b.arrayExpression([]),
                b.identifier('slice'),
                false
              ),
              b.identifier('call'),
              false
            ),
            [b.identifier('arguments'), b.literal(numArgs)]
          )
        )
      ])
    );

    delete node.rest;
  }

  this.traverse(path);
};

Visitor.visitor = new Visitor();

module.exports = Visitor;
