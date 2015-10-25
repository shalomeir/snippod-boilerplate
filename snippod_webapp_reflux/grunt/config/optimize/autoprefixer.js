// Configuration for Autoprefixer task(s)
// Automatically adds vendor prefixes to stylesheets if they are needed
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('autoprefixer', {
    server: {
      options: {
        browsers: ['last 2 versions','ie 8', 'ie 9'],
        map: true
      },
      files: [{
        expand: true,
        flatten: true,
        src: '<%= snippod.tmp %>/styles/*.css',
        dest: '<%= snippod.tmp %>/styles/'
      }]
    },
    dist: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'],
        map: true
      },
      files: [{
        expand: true,
        flatten: true,
        src: '<%= snippod.dist %>/client/styles/*.css',
        dest: '<%= snippod.dist %>/client/styles/'
      }]
    }
  });

};

module.exports = taskConfig;
