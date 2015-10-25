/*jshint esnext:true*/
/*global assert*/
function simpleVarDestructuringOjectPattern(z) {
    var [,x,,y] = z;
    return {
        x:x,
        y:y
    };
}
assert.deepEqual(simpleVarDestructuringOjectPattern([1,2,3,4,5]), {x: 2, y: 4}, 
             'ensure that array elision works');