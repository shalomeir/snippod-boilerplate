# es6-class

Compiles JavaScript written using ES6 classes to use ES5-compatible function
syntax. For example, this:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  toString() {
    return this.name;
  }
}
```

compiles to the equivalent with `Person` as a function. See the [esnext demo
page](https://esnext.github.io/esnext) for more on the behavior and generated
JavaScript.

For more information about the proposed syntax, see the [wiki page on
classes](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes).

## Install

```
$ npm install es6-class
```

## Usage

```js
$ node
> var compile = require('es6-class').compile;
```

Without arguments:

```js
> compile('class Foo {}');
'var Foo = (function() {\n  function Foo() {}\n  return Foo;\n})();'
```

## Browserify

Browserify support is built in.

```
$ npm install es6-class  # install local dependency
$ browserify -t es6-class $file
```

## Contributing

[![Build Status](https://travis-ci.org/esnext/es6-class.png?branch=master)](https://travis-ci.org/esnext/es6-class)

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

Any contributors to the master es6-class repository must sign the [Individual
Contributor License Agreement (CLA)][cla].  It's a short form that covers our
bases and makes sure you're eligible to contribute.

[cla]: https://spreadsheets.google.com/spreadsheet/viewform?formkey=dDViT2xzUHAwRkI3X3k5Z0lQM091OGc6MQ&ndplr=1

When you have a change you'd like to see in the master repository, [send a pull
request](https://github.com/esnext/es6-class/pulls). Before we merge your
request, we'll make sure you're in the list of people who have signed a CLA.
