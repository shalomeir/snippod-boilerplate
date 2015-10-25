// Configuration for Concurrent task(s)
// Runs tasks in parallel to speed up the build process
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('concurrent', {
    images: [
      'imagemin:dist',
    ],
    compile: [
      'sass:dist',
      'browserify:dist'
    ],
    docs: [
      //'jsdoc:dist',
      'styleguide:dist'
    ]
  });

};

module.exports = taskConfig;
