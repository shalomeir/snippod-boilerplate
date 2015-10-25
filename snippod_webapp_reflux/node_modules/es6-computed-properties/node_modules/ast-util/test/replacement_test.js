/* jshint node:true, mocha:true, undef:true, unused:true */

var Replacement = require('../lib').Replacement;
var assert = require('assert');

describe('Replacement', function() {
  var nodePath;

  function makeNodePath() {
    var node = {};
    return {
      node: node,
      replace: function() {
        this.replacedWith = [].slice.call(arguments);
      }
    };
  }

  beforeEach(function() {
    nodePath = makeNodePath();
  });

  describe('.removes', function() {
    it('creates a Replacement that replaces with nothing', function() {
      var repl = Replacement.removes(nodePath);
      repl.replace();
      assert.equal(nodePath.replacedWith.length, 0);
    });
  });

  describe('.swaps', function() {
    it('creates a Replacement that replaces with another', function() {
      var swappedIn = {};
      var repl = Replacement.swaps(nodePath, swappedIn);
      repl.replace();
      assert.equal(nodePath.replacedWith.length, 1);
      assert.strictEqual(nodePath.replacedWith[0], swappedIn);
    });

    it('creates a Replacement that replaces with a list', function() {
      var swappedIn1 = {};
      var swappedIn2 = {};
      var repl = Replacement.swaps(nodePath, [swappedIn1, swappedIn2]);
      repl.replace();
      assert.equal(nodePath.replacedWith.length, 2);
      assert.strictEqual(nodePath.replacedWith[0], swappedIn1);
      assert.strictEqual(nodePath.replacedWith[1], swappedIn2);
    });
  });

  describe('.adds', function() {
    it('creates a Replacement that adds additional nodes', function() {
      var added1 = {};
      var added2 = {};
      var repl = Replacement.adds(nodePath, [added1, added2]);
      repl.replace();
      assert.equal(nodePath.replacedWith.length, 3);
      assert.strictEqual(nodePath.replacedWith[0], nodePath.node);
      assert.strictEqual(nodePath.replacedWith[1], added1);
      assert.strictEqual(nodePath.replacedWith[2], added2);
    });
  });

  describe('.map', function() {
    var from1;
    var from2;
    var nodeArrayPath;
    var to1;
    var to2;

    beforeEach(function() {
      from1 = makeNodePath();
      from2 = makeNodePath();
      nodeArrayPath = [from1, from2];
      nodeArrayPath.each = nodeArrayPath.forEach;
      to1 = {};
      to2 = {};
    });

    it('creates a Replacement with the results of the map', function() {
      var repl = Replacement.map(nodeArrayPath, function(nodePath) {
        if (nodePath === from1) {
          return Replacement.swaps(nodePath, to1);
        } else if (nodePath === from2) {
          return Replacement.swaps(nodePath, to2);
        } else {
          assert.ok(false, 'unexpected argument to callback: ' + nodePath);
        }
      });

      repl.replace();

      assert.equal(from1.replacedWith.length, 1);
      assert.strictEqual(from1.replacedWith[0], to1);
      assert.equal(from2.replacedWith.length, 1);
      assert.strictEqual(from2.replacedWith[0], to2);
    });

    it('ignores null returns from the callback', function() {
      var repl = Replacement.map(nodeArrayPath, function(nodePath) {
        if (nodePath === from1) {
          return Replacement.swaps(nodePath, to1);
        } else if (nodePath === from2) {
          return null;
        } else {
          assert.ok(false, 'unexpected argument to callback: ' + nodePath);
        }
      });

      repl.replace();

      assert.equal(from1.replacedWith.length, 1);
      assert.strictEqual(from1.replacedWith[0], to1);
      assert.equal(from2.replacedWith, null);
    });
  });

  describe('#and', function() {
    it('adds the given Replacement to the receiver', function() {
      var node1 = {};
      var anotherNodePath = makeNodePath();
      var repl = Replacement.swaps(
        nodePath, node1
      ).and(
        Replacement.removes(anotherNodePath)
      );

      repl.replace();

      assert.equal(nodePath.replacedWith.length, 1);
      assert.strictEqual(nodePath.replacedWith[0], node1);
      assert.equal(anotherNodePath.replacedWith.length, 0);
    });
  });
});
