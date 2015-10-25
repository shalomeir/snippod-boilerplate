/*jshint esnext:true*/
/*global assert*/

function onlyRest(arg) {
    var [...result] = arg;
    return result;
}


function restAndVar(arg) {
    var [x, ...result] = arg;
    return {
        x: x,
        result: result
    }
}

function restVarAndElision(arg) {
    var [,x,, ...result] = arg;
    return {
        x: x,
        result: result
    }
}

assert.deepEqual(onlyRest([1,2,3,4,5]), [1,2,3,4,5], 
             'ensure that destructuring with only rest works');

assert.deepEqual(restAndVar([1,2,3,4,5]), {x:1, result: [2,3,4,5]}, 
             'ensure that destructuring with variable and rest works');

assert.deepEqual(restVarAndElision([1,2,3,4,5]), {x:2, result: [4,5]}, 
             'ensure that destructuring with variable elision and rest works');