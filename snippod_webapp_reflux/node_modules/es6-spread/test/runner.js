/**
 * We pull in example files from test/examples/*.js. Write your assertions in
 * the file alongside the ES6 spread "setup" code. The node `assert` library
 * will already be in the context.
 */

Error.stackTraceLimit = 20;

var recast = require('recast');

var spread = require('../lib');
var restParams = require('es6-rest-params');

var fs = require('fs');
var path = require('path');
var assert = require('assert');

var RESULTS = 'test/results';

if (!fs.existsSync(RESULTS)) {
  fs.mkdirSync(RESULTS);
}

function normalize(source) {
  return recast.prettyPrint(recast.parse(source)).code;
}

require('example-runner').runCLI(process.argv.slice(2), {
  transform: function(source, testName, filename) {
    var recastOptions = {
      sourceFileName: filename,
      sourceMapName: filename + '.map'
    };

    var ast = recast.parse(source, recastOptions);
    ast = restParams.transform(spread.transform(ast));
    var result = recast.print(ast, recastOptions);

    fs.writeFileSync(path.join(RESULTS, testName + '.js'), result.code, 'utf8');
    fs.writeFileSync(path.join(RESULTS, testName + '.js.map'), JSON.stringify(result.map), 'utf8');
    return result.code;
  },

  context: {
    assertSourceEquivalent: function(expected, actual) {
      assert.equal(normalize('(' + expected + ')'), normalize('(' + actual + ')'));
    }
  }
});
