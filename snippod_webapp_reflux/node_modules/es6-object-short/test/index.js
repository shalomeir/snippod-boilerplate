var expect = require('chai').expect;
var compile = require('..').compile;

describe('ES6ObjectShort', function() {
  function transform(code) {
    return compile(code).code;
  }

  function expectTransform(code, result) {
    expect(transform(code)).to.eql(result);
  }

  it('should fix short object notation', function() {
    var code = [
      'var a = {',
      '  b,',
      '  c',
      '};'
    ].join('\n');

    var result = [
      'var a = {',
      '  b: b,',
      '  c: c',
      '};'
    ].join('\n');

    expectTransform(code, result);
  });

  it('should not alter destructuring assignment object patterns', function() {
    expectTransform('var {a} = 1;', 'var {a} = 1;');
  });
});
