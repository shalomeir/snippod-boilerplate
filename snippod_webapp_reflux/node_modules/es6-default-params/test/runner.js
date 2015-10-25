/* jshint undef:true, unused:true, node:true */

/**
 * We pull in example files from test/examples/*.js. Write your assertions in
 * the file alongside the ES6 default params "setup" code. The node `assert`
 * library will already be in the context.
 */

Error.stackTraceLimit = 20;

var es6defaultParams = require('../lib');

var fs = require('fs');
var path = require('path');
var RESULTS = 'test/results';

if (!fs.existsSync(RESULTS)) {
  fs.mkdirSync(RESULTS);
}

require('example-runner').runCLI(process.argv.slice(2), {
  transform: function(source, testName) {
    var result = es6defaultParams.compile(source);
    fs.writeFileSync(path.join(RESULTS, testName + '.js'), result.code, 'utf8');
    fs.writeFileSync(path.join(RESULTS, testName + '.js.map'), JSON.stringify(result.map), 'utf8');
    return result.code;
  }
});
