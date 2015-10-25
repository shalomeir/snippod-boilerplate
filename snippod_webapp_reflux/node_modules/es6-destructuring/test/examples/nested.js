/* jshint esnext:true */

var {x} = (function() {
  var {x} = {x: 1};
  return {x: x};
})();

assert.equal(x, 1);
