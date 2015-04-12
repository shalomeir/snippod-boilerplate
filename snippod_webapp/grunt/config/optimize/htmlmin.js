// Configuration for HTMLMin task(s)
// Minifies HTML files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('htmlmin', {
    dist: {
      options: {
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        collapseWhitespace: true
      },
      files: [{
        expand: true,
        cwd: '<%= snippod.dist %>/client',
        src: [
          '*.html'
        ],
        dest: '<%= snippod.dist %>/client'
      }]
    }
  });

};

module.exports = taskConfig;
