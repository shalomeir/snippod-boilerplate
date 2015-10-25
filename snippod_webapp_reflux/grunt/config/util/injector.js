// Configuration for Injector task(s)
// Injects Link/Import statements in to specified files
'use strict';

var _str = require('underscore.string');

var taskConfig = function(grunt) {

  grunt.config.set('injector', {
    options: {

    },
    // Inject component scss into main.scss
    sass: {
      options: {
        transform: function(filePath) {
          filePath = filePath.replace('/client/styles/', '');

          return '@import \'' + filePath.slice(0, -5) + '\';';
        },
        starttag: '// [injector]',
        endtag: '// [endinjector]'
      },
      files: {
        '<%= snippod.client %>/styles/main.scss': [
          '<%= snippod.client %>/styles/**/*.scss',
          '!<%= snippod.client %>/styles/main.scss'
        ]
      }
    }
  });

};

module.exports = taskConfig;
