/**
 * We pull in example files from test/examples/*.js. Write your assertions in
 * the file alongside the ES6 "setup" code. The node `assert` library will
 * already be in the context.
 */

/*jshint node:true*/

Error.stackTraceLimit = 20;

var destructuring = require('../lib');
var recast = require('recast');

var fs = require('fs');
var path = require('path');
var RESULTS = 'test/results';

if (!fs.existsSync(RESULTS)) {
  fs.mkdirSync(RESULTS);
}

require('example-runner').runCLI(process.argv.slice(2), {
  context: {
    normalize: function(source) {
      var ast = recast.parse(source);
      return recast.prettyPrint(ast).code;
    }
  },

  transform: function(source, testName, filename) {
    var recastOptions = {
      sourceFileName: filename,
      sourceMapName: filename + '.map'
    };

    var ast = recast.parse(source, recastOptions);
    ast = destructuring.transform(ast);
    var result = recast.print(ast, recastOptions);

    fs.writeFileSync(path.join(RESULTS, testName + '.js'), result.code, 'utf8');
    fs.writeFileSync(path.join(RESULTS, testName + '.js.map'), JSON.stringify(result.map), 'utf8');
    return result.code;
  }
});
