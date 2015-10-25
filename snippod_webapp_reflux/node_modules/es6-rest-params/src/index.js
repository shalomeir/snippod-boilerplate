var recast = require('recast');
var types = recast.types;
var Visitor = require('./visitor');

function transform(ast) {
  return types.visit(ast, Visitor.visitor);
}

/**
 * @param {string} source
 * @param {object} customOptions
 * @return {string}
 */

function compile(source, customOptions) {
  customOptions = customOptions || {};
  var recastOptions = {};

  for (var key in customOptions) {
    recastOptions[key] = customOptions[key];
  }

  var ast = recast.parse(source, recastOptions);
  return recast.print(transform(ast), recastOptions);
}

module.exports = {
  compile: compile,
  transform: transform
};
