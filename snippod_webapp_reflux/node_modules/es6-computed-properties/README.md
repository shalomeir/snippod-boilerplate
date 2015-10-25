# es6-computed-properties

Compiles JavaScript written using ES6 computed properties to use
ES5- or ES3-compatible syntax. For example, this:

```js
var propName = 'code';

var params = {
    [propName]: true
    ['data' + propName.toUpperCase()]: true
};

console.log(params); // {code: true, dataCode: true}
```

compiles to this:

ES5 targeting (default):

```js
var $__Object$defineProperty = Object.defineProperty;
var $__0;

var propName = 'code';

var params = ($__0 = {}, $__Object$defineProperty($__0, propName, {
  value: true,
  enumerable: true,
  configurable: true,
  writable: true
}), $__Object$defineProperty($__0, 'data' + propName.toUpperCase(), {
  value: true,
  enumerable: true,
  configurable: true,
  writable: true
}), $__0);

console.log(params); // {code: true, dataCode: true}
```

If you're using ES5 with accessors (getters/setters) you should compile in ES5 mode, since it correctly handles inherited accessor properties.

In case if you need to support older engines, you may compile to ES3 (runs with `{es: 3}` compile option, or `--es=3` from CLI):

```js
var $__0;

var propName = 'code';
var params = (
  $__0 = {},
  $__0[propName] = true,
  $__0['data' + propName.toUpperCase()] = true,
  $__0
);

console.log(params); // {code: true, dataCode: true}
```

## Install

```
$ npm install es6-computed-properties
```

## Usage

```js
$ node
> var es6ComputedProperties = require('es6-computed-properties')
> es6ComputedProperties.compile(codeWithComputedProperties)
{ "code": ..., "map": ... }
> es6ComputedProperties.transform(anAst)
anotherAst
```

## Browserify

Browserify support is built in.

```
$ npm install es6-computed-properties  # install local dependency
$ browserify -t es6-computed-properties $file
```

## Contributing

[![Build Status](https://travis-ci.org/DmitrySoshnikov/es6-computed-properties.png?branch=master)](https://travis-ci.org/DmitrySoshnikov/es6-computed-properties)

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

