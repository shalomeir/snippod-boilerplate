/*jshint esnext:true*/
/*global assert*/

var callCount = 0;
function foo() {
    callCount++;
    return {x: 1, y: 1};
}

function destructure() {
    var {x, y} = foo();
    return {x: x, y: y};
}

assert.deepEqual(destructure(), {x: 1, y: 1}, 'ensure that destructuring works');
assert.equal(callCount, 1, 'ensure that init expression has been called only once');