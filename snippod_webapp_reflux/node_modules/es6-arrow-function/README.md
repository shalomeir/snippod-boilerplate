# es6-arrow-function [![Build Status](https://travis-ci.org/esnext/es6-arrow-function.svg?branch=master)](https://travis-ci.org/esnext/es6-arrow-function)

Compiles JavaScript written using arrow functions to use ES5-compatible
function syntax. For example, this:

```js
[1, 2, 3].map(n => n * 2);
```

compiles to this:

```js
[1, 2, 3].map(function(n) { return n * 2; });
```

For more information about the proposed syntax, see the [TC39 wiki page on
arrow functions](http://tc39wiki.calculist.org/es6/arrow-functions/).

## Install

```
$ npm install es6-arrow-function
```

## Usage

```js
$ node
> var compile = require('es6-arrow-function').compile;
[Function]
```

Without arguments:

```js
> compile('$(() => main());').code;
'$(function() { return main(); });'
```

With a single argument:

```js
> compile('[1, 2, 3].map(n => n * 2);').code;
'[1, 2, 3].map(function(n) { return n * 2; });'
```

With multiple arguments:

```js
> compile('[1, 2, 3].map((n, i) => n * i);').code;
'[1, 2, 3].map(function(n, i) { return n * i; });'
```

It binds the current context:

```js
> compile('stream.on("data", d => this.data += d);').code;
'stream.on("data", (function(d) { return this.data += d; }).bind(this));'
```

Or work directly with the AST:

```js
$ cat ast.json
{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "$"
        },
        "arguments": [
          {
            "type": "ArrowFunctionExpression",
            "id": null,
            "params": [],
            "defaults": [],
            "body": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "main"
              },
              "arguments": []
            },
            "rest": null,
            "generator": false,
            "expression": true
          }
        ]
      }
    }
  ]
}
$ node
> var transform = require('es6-arrow-function').transform;
[Function]
> console.log(JSON.stringify(transform(require('./ast.json')), null, 2));
{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "$"
        },
        "arguments": [
          {
            "type": "FunctionExpression",
            "id": null,
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": [
                {
                  "type": "ReturnStatement",
                  "argument": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "Identifier",
                      "name": "main"
                    },
                    "arguments": []
                  }
                }
              ]
            },
            "rest": null,
            "generator": false,
            "expression": false
          }
        ]
      }
    }
  ]
}
```

## Command line

If installing via `npm` a command line tool will be available called `es6-arrow-function`.

```
$ echo "()=>123" | es6-arrow-function
(function () {
  return 123;
});
```

```
$ es6-arrow-function $file
(function () {
  return 123;
});
```

## Browserify

Browserify support is built in.

```
$ npm install es6-arrow-function  # install local dependency
$ browserify -t es6-arrow-function $file
// BOILERPLATE
(function () {
  return 123;
});
```

## Contributing

[![Build Status](https://travis-ci.org/square/es6-arrow-function.png?branch=master)](https://travis-ci.org/square/es6-arrow-function)

### Setup

First, install the development dependencies:

```
$ npm install
```

Then, try running the tests:

```
$ npm test
```

### Pull Requests

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Any contributors to the master es6-arrow-function repository must sign the
[Individual Contributor License Agreement (CLA)][cla].  It's a short form that
covers our bases and makes sure you're eligible to contribute.

[cla]: https://spreadsheets.google.com/spreadsheet/viewform?formkey=dDViT2xzUHAwRkI3X3k5Z0lQM091OGc6MQ&ndplr=1

When you have a change you'd like to see in the master repository, [send a pull
request](https://github.com/square/es6-arrow-function/pulls). Before we merge
your request, we'll make sure you're in the list of people who have signed a
CLA.
