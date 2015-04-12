// Configuration for JSLHint task(s)
// Runs JSHint on specified files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('jshint', {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    test: [
      'Gruntfile.js',
      '<%= snippod.client %>/scripts/**/*.js',
      '!<%= snippod.client %>/scripts/vendor/**/*.*'
    ]
  });

};

module.exports = taskConfig;
