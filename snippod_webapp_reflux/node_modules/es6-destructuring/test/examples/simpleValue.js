/*jshint esnext:true*/
/*global assert*/
function simpleVarDestructuringOjectPattern(z) {
    var {x, y} = z;
    return {
        x: x,
        y: y
    };
}

function simpleVarArrayPatternDestructuring(z) {
    var [x, y] = z;
    return {
        x: x,
        y: y
    };
}

assert.deepEqual(simpleVarDestructuringOjectPattern({ x: 10, y: 3 }),  { x: 10, y: 3 }, 
                 'ensure that simple destrucuring with object pattern works');

assert.deepEqual(simpleVarArrayPatternDestructuring([1, 3]),  { x: 1, y: 3 }, 
                 'ensure that simple destrucuring with array pattern works');