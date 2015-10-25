/*
 * grunt-injector
 * https://github.com/klei-dev/grunt-injector
 *
 * Copyright (c) 2013 Joakim Bengtson
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    ext = function (file) {
      return path.extname(file).slice(1);
    };

module.exports = function(grunt) {

  grunt.registerMultiTask('injector', 'Inject references to files into other files (think scripts and stylesheets into an html file)', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      min: false,
      template: null,
      bowerPrefix: null,
      addRootSlash: true,
      starttag: '<!-- injector:{{ext}} -->',
      endtag: '<!-- endinjector -->',
      lineEnding: '\n',
      transform: function (filepath) {
        var e = ext(filepath);
        if (e === 'css') {
          return '<link rel="stylesheet" href="' + filepath + '">';
        } else if (e === 'js') {
          return '<script src="' + filepath + '"></script>';
        } else if (e === 'html') {
          return '<link rel="import" href="' + filepath + '">';
        }
      }
    });

    if (!options.template && !options.templateString) {
      grunt.log.writeln('Missing option `template`, using `dest` as template instead'.grey);
    }

    var filesToInject = {};

    // Iterate over all specified file groups and gather files to inject:

    this.files.forEach(function(f) {
      var template = options.templateString || options.template || options.destFile || f.dest,
          destination = options.destFile || f.dest;

      if (!options.templateString && !grunt.file.exists(template)) {
        grunt.log.error('Could not find template "' + template + '". Injection not possible');
        return false;
      }

      // Group by destination:
      if (!filesToInject[destination]) {
        filesToInject[destination] = {};
      }

      // ...and template:
      if (!filesToInject[destination][template]) {
        filesToInject[destination][template] = [];
      }

      var files = filesToInject[destination][template];

      f.src.forEach(function(filepath) {
        // Warn on and remove invalid source files.
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return;
        }

        // Special handling of bower.json:
        if (path.basename(filepath) === 'bower.json') {
          files.push.apply(files, getFilesFromBower(filepath).map(function (fpath) {
            return {path: fpath, ignore: path.dirname(filepath), key: (options.bowerPrefix || '') + ext(fpath)};
          }));
        } else {
          files.push({path: filepath, key: ext(filepath)});
        }
      });

      // Clear existing content between injectors
      var templateContent = options.templateString || grunt.file.read(template),
        templateOriginal = templateContent;

      var re = getInjectorTagsRegExp(options.starttag, options.endtag);
      templateContent = templateContent.replace(re, function (match, indent, starttag, content, endtag) {
        return indent + starttag + options.lineEnding + indent + endtag;
      });

      if (templateContent !== templateOriginal || !grunt.file.exists(destination)) {
        grunt.file.write(destination, templateContent);
      }
    });

    /**
     * Inject all gathered files per destination, template and starttag:
     */
    _.forIn(filesToInject, function (templates, destination) {
      _.forIn(templates, function (files, template) {
        // Remove possible duplicates:
        files = _.uniq(files);

        files.forEach(function (obj) {
          // Get start and end tag for each file:
          obj.starttag = getTag(options.starttag, obj.key);
          obj.endtag = getTag(options.endtag, obj.key);

          // Fix filename (remove ignorepaths and such):
          var file = unixify(obj.path);
          file = makeMinifiedIfNeeded(options.min, file);
          if (options.ignorePath || obj.ignore) {
            file = removeBasePath(toArray(options.ignorePath).concat(toArray(obj.ignore)), file);
          }
          if (options.addRootSlash) {
            file = addRootSlash(file);
          } else {
            file = removeRootSlash(file);
          }
          obj.file = file;
        });

        // Read template:
        var templateContent = options.templateString || grunt.file.read(template),
            templateOriginal = templateContent;

        // Inject per start tag:
        _.forIn(_.groupBy(files, 'starttag'), function (sources, starttag) {
          var endtag = sources[0].endtag,
              key = sources[0].key;

          // Transform to injection content:
          sources.forEach(function (obj, i) {
            obj.transformed = options.transform(obj.file, i, sources.length);
          });

          // Sort files if needed:
          if (typeof options.sort === 'function') {
            sources.sort(function (a, b) {
              return options.sort(a.file, b.file);
            });
          }

          // Do the injection:
          var re = getInjectorTagsRegExp(starttag, endtag);
          templateContent = templateContent.replace(re, function (match, indent, starttag, content, endtag) {
            grunt.log.writeln('Injecting ' + key.green + ' files ' + ('(' + sources.length + ' files)').grey);
            return indent + starttag + getIndentedTransformations(sources, indent, options.lineEnding) + endtag;
          });
        });

        // Write the destination file.
        if (templateContent !== templateOriginal || !grunt.file.exists(destination)) {
          grunt.file.write(destination, templateContent);
        } else {
          grunt.log.ok('Nothing changed');
        }
      });
    });

  });
};

function getInjectorTagsRegExp (starttag, endtag) {
  return new RegExp('([\t ]*)(' + escapeForRegExp(starttag) + ')(\\n|\\r|.)*?(' + escapeForRegExp(endtag) + ')', 'gi');
}

function getTag (tag, ext) {
  return tag.replace(new RegExp( escapeForRegExp('{{ext}}'), 'g'), ext);
}

function getFilesFromBower (bowerFile) {
  
  // Load bower dependencies via `wiredep` programmatic access
  var dependencies = require('wiredep')({
        'bowerJson': JSON.parse(fs.readFileSync(bowerFile, 'utf8')),
        'directory': getBowerComponentsDir(bowerFile)
      } 
    );
     
  // Pluck out just the JS and CSS Dependencies
  var filteredDependencies = _.pick(dependencies,'css','js');
  
  // Concatenate into a filepaths array   
  return Object.keys(filteredDependencies).reduce(function (files, key) {
       return files.concat(filteredDependencies[key]);
    }, []);
}

function getBowerComponentsDir (bowerFile) {
  var bowerBaseDir = path.dirname(bowerFile),
      bowerRcFile = path.join(bowerBaseDir, '.bowerrc'),
      dir = 'bower_components';

  if (fs.existsSync(bowerRcFile)) {
    try {
      dir = JSON.parse(fs.readFileSync(bowerRcFile, 'utf8')).directory;
    } catch (e) {
    }
  }
  return path.join(bowerBaseDir, dir);
}

function unixify (path) {
  return path.replace(/\\/g, '/');
}

function makeMinifiedIfNeeded (doMinify, filepath) {
  if (!doMinify) {
    return filepath;
  }
  var ext = path.extname(filepath);
  var minFile = filepath.slice(0, -ext.length) + '.min' + ext;
  if (fs.existsSync(minFile)) {
    return minFile;
  }
  return filepath;
}

function toArray (arr) {
  if (!Array.isArray(arr)) {
    return arr ? [arr] : [];
  }
  return arr;
}

function addRootSlash (filepath) {
  return filepath.replace(/^\/*([^\/])/, '/$1');
}
function removeRootSlash (filepath) {
  return filepath.replace(/^\/+/, '');
}

function removeBasePath (basedir, filepath) {
  return toArray(basedir).reduce(function (path, remove) {
    if (remove && path.indexOf(remove) === 0) {
      return path.slice(remove.length);
    } else {
      return path;
    }
  }, filepath);
}

function escapeForRegExp (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function getIndentedTransformations (sources, indent, lineEnding) {
  var transformations = sources.map(function (s) {
    return s.transformed;
  });
  transformations.unshift('');
  transformations.push('');
  return transformations.join(lineEnding + indent);
}

