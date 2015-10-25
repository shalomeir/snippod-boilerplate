# es6-default-params

Compiles JavaScript written using ES6 default function parameters to use
ES5-compatible function syntax. For example, this:

```js
function add(x=0, y=0) {
  return x + y;
}
```

compiles to this:

```js
function add() {
  var x = (arguments[0] !== void 0 ? arguments[0] : 0);
  var y = (arguments[1] !== void 0 ? arguments[1] : 0);
  return x + y;
}
```

This project is part of [esnext][esnext], a project to compile the syntax of
the next version of JavaScript to today's JavaScript environments.

For more information about the proposed syntax, see the [wiki page on default
params](http://tc39wiki.calculist.org/es6/default-parameter-values/).

## Install

```
$ npm install es6-default-params
```

## Usage

```js
$ node
> var es6defaultParams = require('es6-default-params')
> es6defaultParams.compile(codeWithDefaultParams)
{ "code": ..., "map": ... }
> es6defaultParams.transform(anAst)
anotherAst
```

## Browserify

Browserify support is built in.

```
$ npm install es6-default-params  # install local dependency
$ browserify -t es6-default-params $file
```

## Contributing

[![Build Status](https://travis-ci.org/esnext/es6-default-params.png?branch=master)](https://travis-ci.org/esnext/es6-default-params)

### Setup

First, install the development dependencies:

```
$ npm install
```

Then, try running the tests:

```
$ npm test
```

To run specific example files:

```
$ node test/runner test/examples/my-example.js test/examples/other-example.js
```

### Pull Requests

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Any contributors to the master es6-default-params repository must sign the
[Individual Contributor License Agreement (CLA)][cla].  It's a short form that
covers our bases and makes sure you're eligible to contribute.

[cla]: https://spreadsheets.google.com/spreadsheet/viewform?formkey=dDViT2xzUHAwRkI3X3k5Z0lQM091OGc6MQ&ndplr=1

When you have a change you'd like to see in the master repository, [send a pull
request](https://github.com/esnext/es6-default-params/pulls). Before we merge
your request, we'll make sure you're in the list of people who have signed a
CLA.

[esnext]: https://github.com/esnext/esnext
