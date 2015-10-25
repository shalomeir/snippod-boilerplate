/* jshint undef:true, unused:true, node:true */
var assert = require('assert');
var through = require('through');
var recast = require('recast');
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;
var es6arrowFn = require('es6-arrow-function');
var Visitor = require('./visitor');

/**
 * Transform an Esprima AST generated from ES6 by replacing all default params
 * with an equivalent approach in ES5. Because of the way default params work,
 * we need to also transform arrow functions to normal functions first.
 *
 * NOTE: The argument may be modified by this function. To prevent modification
 * of your AST, pass a copy instead of a direct reference:
 *
 *   // instead of transform(ast), pass a copy
 *   transform(JSON.parse(JSON.stringify(ast));
 *
 * @param {Object} ast
 * @return {Object}
 */
function transform(ast) {
  return types.visit(es6arrowFn.transform(ast), Visitor.visitor);
}

/**
 * Transform JavaScript written using ES6 by replacing all default params with
 * the equivalent ES5.
 *
 *   compile('function add(a=0, b=0){ return a + b; }');
 *   `function add() {
 *      var a = (arguments[0] !== void 0 ? arguments[0] : 0);
 *      var b = (arguments[1] !== void 0 ? arguments[1] : 0);
 *      return a + b;
 *    }`
 *
 *
 * @param {string} source
 * @param {{sourceFileName: string, sourceMapName: string}} mapOptions
 * @return {string}
 */
function compile(source, mapOptions) {
  mapOptions = mapOptions || {};

  var recastOptions = {
    sourceFileName: mapOptions.sourceFileName,
    sourceMapName: mapOptions.sourceMapName
  };

  var ast = recast.parse(source, recastOptions);
  return recast.print(transform(ast), recastOptions);
}

module.exports = function () {
  var data = '';
  return through(write, end);

  function write (buf) { data += buf; }
  function end () {
      this.queue(module.exports.compile(data).code);
      this.queue(null);
  }
};

module.exports.compile = compile;
module.exports.transform = transform;
