/*jshint esnext:true*/
/*global assert*/
var callCount = 0;
function foo() {
    callCount++;
}

function destructureObject() {
    var {} = foo();
}

function destructurArray() {
    var [] = foo();
}

destructureObject();
assert.equal(callCount, 1, 'ensure that empty object pattern execute init');
destructurArray();
assert.equal(callCount, 2, 'ensure that empty pattern execute init');

