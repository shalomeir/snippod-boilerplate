/* jshint node:true, undef:true, unused:true */

var recast     = require('recast');
var through    = require('through');
var astUtil    = require('ast-util');
var types      = recast.types;
var n          = types.namedTypes;
var b          = types.builders;
var stringType = types.builtInTypes.string;

var _noIterator;

function pushAll(arr, data) {
    arr.push.apply(arr, data);
}


function isPattern(node) {
  return (n.ObjectPattern.check(node) || n.ArrayPattern.check(node));
}

function isEmptyPattern(pattern) {
    return (
        (n.ArrayPattern.check(pattern) && pattern.elements.length === 0) ||
        (n.ObjectPattern.check(pattern) && pattern.properties.length === 0)
    );
}

function getIteratorValue(scope, iterator, iteratorValue, idx, len) {
    return b.sequenceExpression([
        b.assignmentExpression(
            '=',
            iteratorValue,
            astUtil.callGetIteratorRange(
                scope.getGlobalScope(),
                iterator,
                b.memberExpression(
                    iteratorValue,
                    b.identifier('index'),
                    false
                ),
                b.literal(idx),
                typeof len !== 'undefined' ? b.literal(1): b.literal(Infinity)
            )
        ),
        typeof len !== 'undefined' ? 
            b.memberExpression(
                b.memberExpression(
                    iteratorValue,
                    b.identifier('range'),
                    false
                ),
                b.literal(0),
                true
            ) :  
            b.memberExpression(
                iteratorValue,
                b.identifier('range'),
                false
            )
      ]);
}

var uidVar = 0,
    uidArg = 0,
    uidIt = 0;

var VISITOR = {
    visitVariableDeclaration: function(nodePath) {
        var node = nodePath.node;
        node.declarations = node.declarations.reduce(
            function (declarations, decl) {
                var id = decl.id;
                if(isPattern(id)) {
                    pushAll(declarations,
                      createVariableDeclarationsFromPattern(decl.id, decl.init, nodePath.scope));
                } else {
                    declarations.push(decl);
                }
                return declarations;
            }, []
        );

        this.traverse(nodePath);
    },

    visitFunction: function(nodePath) {
        var node = nodePath.node;
        var declarations = [];
        node.params = node.params.map(function(param) {
            if (isPattern(param)) {
                var id = b.identifier('arg$'+ (uidArg++));
                pushAll(declarations, createVariableDeclarationsFromPattern(param, id, nodePath.scope));
                return id;
            }
            return param;
        });
        if (declarations.length) {
            node.body.body.unshift(b.variableDeclaration('var', declarations));
        }

        this.traverse(nodePath);
    },

    visitAssignmentExpression: function(nodePath) {
        var node = nodePath.node;
        if (isPattern(node.left)) {
            return b.variableDeclaration(
                'var',
                createVariableDeclarationsFromPattern(node.left, node.right, nodePath.scope)
            );
        }

        this.traverse(nodePath);
    }
};

/**
 * from a given destructuration pattern, and associated value expression
 * create variable declarations that desugar these pattern
 * 
 * @param {Node} pattern the destructuration pattern
 * @param {Node} expr the value expression to destructure
 * @param {Scope} scope
 */
function createVariableDeclarationsFromPattern(pattern, expr, scope) {
    var id;
    var results = [];
    if (n.ObjectPattern.check(pattern) && pattern.properties.length === 1) {
        id = expr;
    } else if (n.ArrayPattern.check(pattern) && pattern.elements.length === 1) {
        id = expr;
    } else if ((n.Identifier.check(expr) || stringType.check(expr)) &&  !isEmptyPattern(pattern)) {
        id = expr;
    } else {
        id = b.identifier('var$' + (uidVar++));
        results.push(b.variableDeclarator(id, expr)); 
    }
    
    if (n.ObjectPattern.check(pattern)) {
        pattern.properties.forEach(function(prop) {
            var value = b.memberExpression(id, prop.key, false);
            if (isPattern(prop.value)) {
                pushAll(results, createVariableDeclarationsFromPattern(prop.value, value, scope));
            } else {
                results.push(b.variableDeclarator(b.identifier(prop.value.name), value));
            }
        });
    } else {
        var iterator, iteratorValue;
        if (pattern.elements.length && !_noIterator) {
            var uid = (uidIt++);
            iterator = b.identifier('iterator$' + uid );
            iteratorValue = b.identifier('iteratorValue$' + uid);
            results.push(
                b.variableDeclarator(
                    iterator, 
                    astUtil.callGetIterator(scope.getGlobalScope(), id)
                ),
                b.variableDeclarator(
                    iteratorValue,
                    b.objectExpression([
                        b.property(
                            'init',
                            b.identifier('index'),
                            b.literal(0)
                        )
                    ])
                )
            );    
        }
        pattern.elements.forEach(function(elem, idx) {
            // null means skip
            if (elem === null) {
                return;
            }
            
            var value;
            if (!n.SpreadElement.check(elem)) {
                if (!_noIterator) {
                  value = getIteratorValue(scope, iterator, iteratorValue, idx, 1);
                } else {
                  value = b.memberExpression(id, b.literal(idx), true);
                }
                
                if (isPattern(elem)) {
                    pushAll(results, createVariableDeclarationsFromPattern(elem, value, scope));
                } else  {
                    results.push(b.variableDeclarator(b.identifier(elem.name), value));
                }  
            } else {
                if (!_noIterator) {
                    value = getIteratorValue(scope, iterator, iteratorValue, idx);
                } else {
                    value = b.callExpression(
                        b.memberExpression(id, b.identifier('slice'), false),
                        [b.literal(idx)]
                    );
                }
                results.push(b.variableDeclarator(b.identifier(elem.argument.name), value));
            }
        });
    }
    
    return results;
}

/**
 * Transform an Esprima AST generated by desugaring all destructuration expression
 *
 * NOTE: The argument may be modified by this function. To prevent modification
 * of your AST, pass a copy instead of a direct reference:
 *
 *   // instead of transform(ast), pass a copy
 *   transform(JSON.parse(JSON.stringify(ast));
 *
 * @param {Object} ast
 * @return {Object}
 */
function transform(ast, noIterator) {
    _noIterator = noIterator;
    uidVar = uidArg = uidIt = 0;
    return types.visit(ast, VISITOR);
}

/**
 * Transform JavaScript written using ES6 by desugaring all destructuring
 *
 *   compile('var {x, y} = z'); // 'var x = z.x, y = z.y'
 *
 * @param {string} source
 * @param {object} options
 * @return {string}
 */
function compile(source, options) {
    options = options || {};
    
    var recastOptions = {
      sourceFileName: options.sourceFileName,
      sourceMapName: options.sourceMapName
    };

    var ast = recast.parse(source, recastOptions);
    return recast.print(transform(ast, !!options.noIterator), recastOptions);
}

module.exports = function(file, options) {
    var data = '';
    return through(write, end);

    function write(buf) { data += buf; }
    function end() {
        this.queue(module.exports.compile(data, options).code);
        this.queue(null);
    }
};

module.exports.compile = compile;
module.exports.transform = transform;
