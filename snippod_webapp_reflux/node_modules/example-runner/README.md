# example-runner

Run example files with assertions. example-runner can be used as a very basic
test runner, optionally with a source transform function. This makes it
suitable for testing JavaScript-to-JavaScript compilers such as
[es6-class][es6-class], where it is used.

## Install

```
$ npm install [--save-dev] example-runner
```

## Usage

example-runner has two exported functions: `run` and `runCLI`. Most of the time
you'll probably want to use `runCLI` which prints to stdout and exits with the
appropriate status code. If you need to customize the output or exit behavior
of example-runner, such as to fit it into another tool, you can use `run`.

### runCLI(files, options)

With no arguments, `runCLI` will run `test/examples/*.js`.

```js
require('example-runner').runCLI();
```

You can run specific files if you want:

```js
require('example-runner').runCLI(['a.js', 'b.js']);
```

Provide the `transform` option if you want to modify your examples before
running, such as with [sweet.js][sweet.js]:

```js
require('example-runner').runCLI({
  transform: function(source, testName, filename, options) {
    return sweetjs.compile(source);
  }
});
```

The arguments given to `transform` are:

* **source**: A string with the source of the example file.
* **testName**: The base name of the example file, sans `.js` suffix.
* **filename**: The path to the example file.
* **options**: Options parsed from comments in the source of the example file.
  This is useful if how you transform the source is different per file and you
  need a way to configure it. For example, `/* config a:b, log:true */` in the
  source file will create options like so: `{ config: { a: "b", log: true } }`.

If you need to pass data to your example files, use the `context` option.

```js
require('example-runner').runCLI({
  context: { mydata: [1, 2], mylib: require('mylib') }
});
```

 Note that there are some default context properties:

* **assert**: This is the node assert library. At least one assertion must be
  made for an example file to be considered successful. You can disable this
  behavior by adding `/* example-runner assert:false */` at the top of your
  example file.
* **__options**: This is the same options object passed to `transform` (see
  above).

### run(files, options)

Like `runCLI()`, `run()` takes files and options. Unlike `runCLI()` it returns
an `EventEmitter` that emits three events:

* `pass(testName)`: called when an example file passes
* `fail(testName, error)`: called when an example file fails, along with the
  error thrown
* `done(passed, failed)`: called when all tests have run, along with the
  names of the passed and failed examples

[es6-class]: https://github.com/square/es6-class
[sweet.js]: http://sweetjs.org/
