/* optgroup1 a:b, foo: true */
/* optgroup2 n:1 */

assert.strictEqual(__options.optgroup1.a, 'b');
assert.strictEqual(__options.optgroup1.foo, true);
assert.strictEqual(__options.optgroup2.n, 1);
