# grunt-esnext

[![NPM version](https://badge.fury.io/js/grunt-esnext.svg)](https://www.npmjs.org/package/grunt-esnext)
[![Build Status](https://travis-ci.org/shinnn/grunt-esnext.svg?branch=master)](https://travis-ci.org/shinnn/grunt-esnext)
[![Dependency Status](https://david-dm.org/shinnn/grunt-esnext.svg)](https://david-dm.org/shinnn/grunt-esnext)
[![devDependency Status](https://david-dm.org/shinnn/grunt-esnext/dev-status.svg)](https://david-dm.org/shinnn/grunt-esnext#info=devDependencies)

Grunt task for compiling JS.next to JS.today, using [esnext](https://github.com/esnext/esnext)

## Getting Started

This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-esnext --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-esnext');
```

## The `esnext` task

Run this task with the `grunt esnext` command.

### Options

#### sourceMap

Type: `Boolean` or `String` (`"inline"`)  
Default: `true` if `sourceMapName` option is specified, otherwise `false`

Generate a source map (including [regenerator][regenerator] runtime if [`includeRuntime` option](#includeruntime) is enabled).

`true` writes a source map file in addition to the compiled file. 

`"inline"` appends a base64-encoded source map to the compiled file.

#### sourceMapName

Type: `String`  
Default: Compiled file name + `.map`

Rename source map files. Both relative path and absolute path are available.

#### arrayComprehensions

Type: `Boolean`  
Default: `false`

> Compile [ES6 array comprehensions](https://github.com/lukehoban/es6features#comprehensions).

#### arrowFunction

Type: `Boolean`  
Default: `true`

> Compile [ES6 arrow functions](https://github.com/lukehoban/es6features#arrows) into normal functions.

#### class

Type: `Boolean`  
Default: `true`

> Compile [ES6 classes](https://github.com/lukehoban/es6features#classes) into ES5 constructors.

#### computedPropertyKeys

Type: `Boolean`  
Default: `true`

> Compile [ES6 computed property keys][object].

#### defaultParams

Type: `Boolean`  
Default: `true`

> Compile [ES6 default parameters][params] to ES5.

#### destructuring

Type: `Boolean`  
Default: `true`

> Compile [ES6 destructuring assignment](https://github.com/lukehoban/es6features#destructuring).

#### generator

Type: `Boolean`  
Default: `true`

> Compile [generator functions](https://github.com/lukehoban/es6features#generators) into ES5.

#### includeRuntime

Type: `Boolean`  
Default: `false`

Include [regenerator]([regenerator]) runtime library if [`generator` option](#generator) is enabled. Even though source is more than one file, runtime is appended to the concatenated file only once.

#### objectConcise

Type: `Boolean`  
Default: `true`

> Compile [object literal concise method definitions][object].

#### rest

Type: `Boolean`  
Default: `true`

> Compile [rest params][params] into ES5.

#### spread

Type: `Boolean`  
Default: `true`

> Compile [spread operator][params].

#### templates

Type: `Boolean`  
Default: `true`

> Compile [template strings](https://github.com/lukehoban/es6features#template-strings) into ES5.

#### regexpu

Type: `Boolean`  
Default: `true`

> Compile [unicode regexes](https://github.com/lukehoban/es6features#unicode) into ES5.

## Usage Example

```javascript
grunt.initConfig({
  esnext: {
    options: {
      includeRuntime: true
    },
    dist: {
      src: ['src/main/*.js'],
      dest: 'dist/main.js' 
    }
  }
});

grunt.loadNpmTasks('grunt-esnext');
grunt.registerTask('default', ['esnext']);
```

## License

Copyright (c) [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT license](./LICENSE)

[object]: https://github.com/lukehoban/es6features#enhanced-object-literals
[params]: https://github.com/lukehoban/es6features#default--rest--spread
[regenerator]: https://github.com/facebook/regenerator
