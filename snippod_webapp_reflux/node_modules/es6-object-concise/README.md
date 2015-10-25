# es6-object-concise

Compiles JavaScript written using ES6 object method declaration to ES3 syntax.
For example, this:

```js
var a = {
  b() {
    return "c";
  }
};
```

is mostly equivalent to:

```js
var a = {
  b: function b() {
    return "c";
  }
};
```

## Install

```
$ npm install es6-object-concise
```

## Browserify

Browserify support is built in.

```
$ npm install es6-object-concise  # install local dependency
$ browserify -t es6-object-concise $file
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
