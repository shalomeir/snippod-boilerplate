// grunt-esnext
// Copyright (c) 2014 Shinnosuke Watanabe
// Licensed under the MIT license

'use strict';

var path = require('path');

var chalk = require('chalk');
var esnextTransform = require('esnext').transform;
var esprima = require('esprima-fb');
var inlineSourceMapComment = require('inline-source-map-comment');
var isAbsolutePath = require('is-absolute');
var recast = require('recast');
var regeneratorRuntimePath = require('regenerator').runtime.path;

var runtime = '';

module.exports = function(grunt) {
  grunt.registerMultiTask('esnext', 'Transpile JS.next to JS.today', function() {
    var options = this.options();

    // Iterate over all specified src/dest file groups
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file ' + filepath + ' not found.');
          return false;
        }
        return true;
      });

      if (src.length === 0) {
        grunt.log.warn(
          'Destination ' +
          chalk.cyan(f.dest) +
          ' not written because src files were empty.'
        );
        return;
      }

      var ast;

      if (options.generator !== false && options.includeRuntime) {
        runtime = runtime || grunt.file.read(regeneratorRuntimePath);
        ast = recast.parse(runtime, {
          sourceFileName: regeneratorRuntimePath
        });

        options.includeRuntime = false;
      } else {
        ast = recast.parse('');
      }

      var sourceMapPath = options.sourceMapName;
      if (options.sourceMap && !sourceMapPath) {
        sourceMapPath = f.dest + '.map';
      }

      src.forEach(function(filePath) {
        var fileBody = recast.parse(grunt.file.read(filePath), {
          esprima: esprima,
          sourceFileName: path.relative(path.dirname(sourceMapPath), filePath)
        }, options).program.body;
        ast.program.body.push.apply(ast.program.body, fileBody);
      });

      var sourceMapURL;
      if (sourceMapPath) {
        if (isAbsolutePath(sourceMapPath)) {
          sourceMapURL = sourceMapPath;
        } else {
          sourceMapURL = path.relative(path.dirname(f.dest), sourceMapPath);
        }
      }

      var result = recast.print(esnextTransform(ast, options), {
        sourceMapName: sourceMapURL
      });
      
      var sourceMap;
      if (result.map) {
        delete result.map.sourcesContent;
        sourceMap = JSON.stringify(result.map);
      }
      
      var code = result.code;
      if (options.sourceMap === 'inline') {
        code += '\n' + inlineSourceMapComment(sourceMap) + '\n';
        sourceMap = null;
      } else if (sourceMapPath) {
        code += '\n//# sourceMappingURL=' + sourceMapURL + '\n';
      }

      grunt.file.write(f.dest, code);
      grunt.log.writeln('File ' +  chalk.cyan(f.dest) + ' created.');

      if (sourceMap) {
        grunt.file.write(sourceMapPath, sourceMap);
        grunt.log.writeln('File ' + chalk.cyan(sourceMapPath) + ' created.');
      }
    });
  });
};
