// Configuration for Sass task(s)
// Compile Sass stylesheets to single `.css` file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('sass', {
    server: {
      options: {
        precision: 10,
        outputStyle: 'nested',
        sourceMap: true,
        includePaths: [
          '<%= snippod.client %>/bower_components',
          '<%= snippod.client %>/styles/'
        ]
      },
      files: {
        '<%= snippod.tmp %>/styles/main.css': '<%= snippod.client %>/styles/main.{scss,sass}'
      }
    },
    dist: {
      options: {
        precision: 10,
        outputStyle: 'compressed',
        sourceMap: true,
        includePaths: [
          '<%= snippod.client %>/bower_components',
          '<%= snippod.client %>/styles/'
        ]
      },
      files: {
        '<%= snippod.dist %>/client/styles/main.css': '<%= snippod.client %>/styles/main.{scss,sass}'
      }
    }
  });

};

module.exports = taskConfig;
