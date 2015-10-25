# es6-object-short

Compiles JavaScript written using ES6 short object properties to ES4 syntax.
For example, this:

```js
var a = {
  b,
  c
};
```

compiles to this:

```js
var a = {
  b: b,
  c: c
};
```

## Install

```
$ npm install es6-object-short
```

## Browserify

Browserify support is built in.

```
$ npm install es6-object-short  # install local dependency
$ browserify -t es6-object-short $file
```

### Setup

First, install the development dependencies:

```
$ npm install
```

Then, try running the tests:

```
$ npm test
```
