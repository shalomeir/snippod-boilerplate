/*jshint esnext:true*/
/*global assert*/
function destrucureVar(arg) {
    var {z: x, y} = arg;
    return {
        x: x,
        y: y
    };
}

function destrucureArg({x, z: y}) {
    return {
        x: x,
        y: y
    };
}

assert.deepEqual(destrucureVar({z: 1, y: 10}), { x: 1, y: 10},
                'ensure that variable renaming in destrucuring pattern works with var destrucuring');

assert.deepEqual(destrucureArg({x: 6, z: 3}), { x: 6, y: 3},
                'ensure that variable renaming in destrucuring pattern works with var destrucuring');