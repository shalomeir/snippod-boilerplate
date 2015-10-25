/*jshint esnext:true*/
/*global assert*/

function destructureArrayObject(arg) {
    var [x, {y}] = arg;
    return {
        x: x,
        y: y
    };
}

function destructureArrayArray(arg) {
    var [x, [y]] = arg;
    return {
        x: x,
        y: y
    };
}

function destructureObjectArray(arg) {
    var {x:[x], y:[y] } = arg;
    return {
        x: x,
        y: y
    };
}

function destructureObjectObject(arg) {
    var {x, y:{y} } = arg;
    return {
        x: x,
        y: y
    };
}


assert.deepEqual(destructureArrayObject([1,{y: 2}]), {x:1, y:2}, 
                 'ensure that mixed array/object pattern works');

assert.deepEqual(destructureArrayArray([1,[5]]), {x:1, y:5}, 
                 'ensure that mixed array/array pattern works');

assert.deepEqual(destructureObjectArray({x:[3],y:[4]}), {x:3, y:4}, 
                 'ensure that mixed object/array pattern works');

assert.deepEqual(destructureObjectObject({x:6, y:{y: 3}}), {x:6, y:3}, 
                 'ensure that mixed object/object pattern works');
