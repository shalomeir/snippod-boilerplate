var recast = require('recast');
var types = recast.types;
var through = require('through');
var b = recast.types.builders;
var n = recast.types.namedTypes;

function Visitor() {
  types.PathVisitor.call(this);
}
Visitor.prototype = Object.create(types.PathVisitor.prototype);
Visitor.prototype.constructor = Visitor;

Visitor.prototype.visitProperty = function(prop) {
  if (n.ObjectExpression.check(prop.parent.node)) {
    if (prop.node.shorthand) {
      prop.node.shorthand = false;
    }
  }

  this.traverse(prop);
};

function transform(ast) {
  return types.visit(ast, new Visitor());
}

function compile(code, options) {
  options = options || {};

  var recastOptions = {
    sourceFileName: options.sourceFileName,
    sourceMapName: options.sourceMapName
  };

  var ast = recast.parse(code, recastOptions);
  return recast.print(transform(ast), recastOptions);
}

module.exports = function () {
  var data = '';

  function write(buf) {
    data += buf;
  }

  function end() {
    this.queue(compile(data).code);
    this.queue(null);
  }

  return through(write, end);
};

module.exports.transform = transform;
module.exports.compile = compile;
