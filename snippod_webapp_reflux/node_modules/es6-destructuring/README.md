# es6-destructuring

desugar [ES6 destructuring](http://wiki.ecmascript.org/doku.php?id=harmony:destructuring) to ES5.

```javascript
var {x, y} = z;

function x(x, {y}) {
}

```

compiles to this:

```js
var x = z.x, y = z.y;
function x(arg$0) {
  var y = arg$0.y;
}
```

## Install

```
$ npm install es6-destructuring
```

## Usage

```js
$ node
> var compile = require('es6-destructuring').compile;
[Function]
> compile('var {x, y} = z;').code;
'var x = z.x, y = z.y;'
```

## Command line

If installing via `npm` a command line tool will be available called `es6-destructuring`.

```
$ echo "var {x, y} = z;" | es6-destructuring
var x = z.x, y = z.y;
```

```
$ es6-destructuring $file
var x = z.x, y = z.y;
```

## Browserify

Browserify support is built in.

```
$ npm install es6-destructuring  # install local dependency
$ browserify -t es6-destructuring $file
// BOILERPLATE
var x = z.x, y = z.y;
```

## Acknowledgements 

This module is a port of [Andrey Popp](https://github.com/andreypopp/) [es6-destructuring-jstransform](https://github.com/andreypopp/es6-destructuring-jstransform) project, I wanted a [recast](https://github.com/benjamn/recast) based transformer, and that's why I ported it, part of [square](https://github.com/square) [es6-arrow-function](https://github.com/square/es6-arrow-function) code has also been used for this module, thanks to Andrey Popp and Square for their amazing work, and thanks to [Ben Newman](https://github.com/benjamn) for the amazing recast project.