if (typeof assert === 'undefined') {
  throw new Error('expected `assert` to be defined');
}

try {
  assert.equal(1, 2);
  throw new Error('expected `assert.equal(1, 2)` to throw');
} catch (ex) {}
