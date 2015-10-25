/*jshint esnext:true*/
/*global assert*/
function destructureSimple({x, y}) {
    return {
        x:x,
        y:y
    };
}

function destructureMiddleArg(x, {y}, z) {
    return {
        x:x,
        y:y,
        z: z
    };
}

function destructureMultiple({x,y}, [z]) {
    return {
        x:x,
        y:y,
        z: z
    };
}

function destructureInner({x}, {y}) {
    return (function ({x, y}) {
        return [x, y];
    })({x:x, y: y});
}



assert.deepEqual(destructureSimple({ x: 1, y: 2}), {x: 1, y: 2}, 
                 'ensure that simple destructuring works');

assert.deepEqual(destructureMiddleArg(3, {y: 2}, 1), {x: 3, y: 2, z: 1}, 
                 'ensure that destructuring works on any args');

assert.deepEqual(destructureMultiple({x: 1, y: 6}, [7]), {x: 1, y: 6, z: 7}, 
                 'ensure that multiple destructuring in arguments works');

assert.deepEqual(destructureInner({x: 1}, {y: 6}), [1, 6], 
                 'ensure destructuring on inner anonymous function works');