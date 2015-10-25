const assert = require('assert');
const compile = require('../../lib').compile;

describe('es6-arrow-function', function() {
  it('resets the "this expression" visitor state after each arrow function', function() {
    // Compile something with "this" in it.
    compile('() => this');

    // Now ensure that the next one isn't bound.
    const code = compile('() => 1').code;
    assert.ok(
      code.indexOf('this') < 0,
      JSON.stringify(code) + ' should not bind "this"'
    );
  });
});
