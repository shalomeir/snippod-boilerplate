/*jshint esnext:true*/
/*global assert*/

// all ObjectPattern must be parenthesized because esprima treat them as block without it ... 

function destructureObject(arg) {
    var x,y;
    ({x, y}) = arg;
    return {x: x, y: y};
}

function destrucureVarRenaming(arg) {
    var x,y;
    ({z: x, y}) = arg;
    return {
        x: x,
        y: y
    };
}

function destructureArray(arg) {
    var x,y;
    [x, y] = arg;
    return {
        x: x,
        y: y
    };
}

var callCount = 0;
function foo() {
    callCount++;
    return {x: 1, y: 6};
}

function destructureComplexValue() {
    var x,y;
    ({x, y}) = foo();
    return {x: x, y: y};
}

assert.deepEqual(destructureObject({x: 5, y: 3}), {x: 5, y: 3}, 'ensure that destructuring works on assignement');
assert.deepEqual(destrucureVarRenaming({z: 7, y: 1}), {x: 7, y: 1}, 'ensure that destructuring works on assignement');
assert.deepEqual(destructureArray([2,8]), {x: 2, y: 8}, 'ensure that destructuring works on assignement');
assert.deepEqual(destructureComplexValue(), {x: 1, y: 6}, 'ensure that destructuring works with complex value');
assert.equal(callCount, 1, 'ensure that right expression has been called only once');

