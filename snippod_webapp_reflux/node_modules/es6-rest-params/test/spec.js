/* jshint evil: true */

var fs = require('fs');
var Path = require('path');
var vm = require('vm');

var expect = require('chai').expect;

var recast = require('recast');
var transform = require('../src/index').transform;

var fixturePath = function(name) {
  return Path.join(__dirname, 'fixtures', name + '.js');
};

var compileFixture = function(path, options) {
  var src = fs.readFileSync(path);
  var ast = recast.parse(src);
  if (options && options.arrowFn) {
    require('es6-arrow-function').transform(ast);
  }
  return recast.print(transform(ast));
};

var assertFixture = function(name, options) {
  var path = fixturePath(name);
  var out = compileFixture(path, options);
  vm.runInNewContext(out.code, { expect: expect }, path);
};

describe('rest params', function() {
  it('compile correctly for fn expressions', function() {
    assertFixture('rest');
  });
  it('compile correctly for fn declarations', function() {
    assertFixture('declaration');
  });
  it('compile correctly for arrow fn expression', function() {
    assertFixture('arrow-fn', { arrowFn: true });
  });
});
