'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.injector = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  defaults: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/defaults.html');
    var expected = grunt.file.read('test/expected/defaults.html');
    test.equal(actual, expected, 'should inject stylesheets, scripts and html components into desired file.');

    test.done();
  },
  templateString: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/templateString.json');
    var expected = grunt.file.read('test/expected/templateString.json');
    test.equal(actual, expected, 'should use templateString as template if specified.');

    test.done();
  },
  ignorePath: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/ignorePath.html');
    var expected = grunt.file.read('test/expected/ignorePath.html');
    test.equal(actual, expected, 'should inject stylesheets, scripts and html components with `ignorePath` removed from file path.');

    test.done();
  },
  noAddRootSlash: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/noAddRootSlash.html');
    var expected = grunt.file.read('test/expected/noAddRootSlash.html');
    test.equal(actual, expected, 'should inject stylesheets, scripts and html components without root slash if `addRootSlash` is false.');

    test.done();
  },
  noAddRootSlashWithIgnorePath: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/noAddRootSlashWithIgnorePath.html');
    var expected = grunt.file.read('test/expected/noAddRootSlashWithIgnorePath.html');
    test.equal(actual, expected, 'should inject stylesheets, scripts and html components without root slash if `addRootSlash` is false and `ignorePath` does not end with a slash.');

    test.done();
  },
  expanded: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/expanded.html');
    var expected = grunt.file.read('test/expected/expanded.html');
    test.equal(actual, expected, 'should inject stylesheets, scripts and html components with the dynamic src files definition.');

    test.done();
  },
  min: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/min.html');
    var expected = grunt.file.read('test/expected/min.html');
    test.equal(actual, expected, 'should inject minified stylesheets, scripts and html components if they exist and `min` option is `true`.');

    test.done();
  },
  bower: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bower.html');
    var expected = grunt.file.read('test/expected/bower.html');
    test.equal(actual, expected, 'should inject dependencies installed with bower.');

    test.done();
  },
  bowerInOtherDir: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bowerInOtherDir.html');
    var expected = grunt.file.read('test/expected/bowerInOtherDir.html');
    test.equal(actual, expected, 'should inject dependencies installed with bower in other directory specified in .bowerrc.');

    test.done();
  },
  bowerMin: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bowerMin.html');
    var expected = grunt.file.read('test/expected/bowerMin.html');
    test.equal(actual, expected, 'should inject minified dependencies installed with bower if they exist and `min` option is `true`.');

    test.done();
  },
  bowerWithIgnore: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bowerWithIgnore.html');
    var expected = grunt.file.read('test/expected/bowerWithIgnore.html');
    test.equal(actual, expected, 'should inject dependencies installed with bower, and it should take `ignorePath` option into account.');

    test.done();
  },
  bowerWithPrefix: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/bowerWithPrefix.html');
    var expected = grunt.file.read('test/expected/bowerWithPrefix.html');
    test.equal(actual, expected, 'should inject dependencies installed with bower, and it should take `bowerPrefix` option into account.');

    test.done();
  },
  bowerWithOverrides: function(test){
    test.expect(1);

    var actual = grunt.file.read('tmp/bowerWithOverrides.html');
    var expected = grunt.file.read('test/expected/bowerWithOverrides.html');
    test.equal(actual, expected,'should inject dependencies installed with bower, and it should take the bower `overrides` declaration into account.');
  
    test.done();
  },
  custom: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom.js');
    var expected = grunt.file.read('test/expected/custom.js');
    test.equal(actual, expected, 'should inject files with custom tags and file transformer.');

    test.done();
  },
  customSort: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/customSort.js');
    var expected = grunt.file.read('test/expected/customSort.js');
    test.equal(actual, expected, 'should inject files ordered with a custom sorting function.');

    test.done();
  }
};
