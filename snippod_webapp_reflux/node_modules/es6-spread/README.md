# es6-spread

Compiles JavaScript written using ES6 spread syntax to use the equivalent ES5
code. For example, this spreads `args` out as positional arguments to `f`:

```js
function f(x, y, z) { }
var args = [0, 1, 2];
f(...args);
```

This project is part of [esnext][esnext], a project to compile the syntax of
the next version of JavaScript to today's JavaScript environments.

For more information about the proposed syntax, see the [wiki page on
spread](http://tc39wiki.calculist.org/es6/spread/).

## Install

```
$ npm install es6-spread
```

## Usage

```js
$ node
> spread = require('es6-spread')
> spread.compile(sourceCode)
{ 'code': ..., 'map': ... }
> spread.transform(someAST)
anotherAST
```

## Browserify

Browserify support is built in.

```
$ npm install es6-spread  # install local dependency
$ browserify -t es6-spread $file
```

## Contributing

[![Build Status](https://travis-ci.org/square/es6-spread.png?branch=master)](https://travis-ci.org/square/es6-spread)

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
$ node test/runner test/examples/my_example.js test/examples/other_example.js
```

### Pull Requests

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Any contributors to the master es6-spread repository must sign the [Individual
Contributor License Agreement (CLA)][cla].  It's a short form that covers our
bases and makes sure you're eligible to contribute.

[cla]: https://spreadsheets.google.com/spreadsheet/viewform?formkey=dDViT2xzUHAwRkI3X3k5Z0lQM091OGc6MQ&ndplr=1

When you have a change you'd like to see in the master repository, [send a pull
request](https://github.com/square/es6-spread/pulls). Before we merge your
request, we'll make sure you're in the list of people who have signed a CLA.

[esnext]: https://github.com/square/esnext
