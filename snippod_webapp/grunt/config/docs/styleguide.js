// Configuration for Knyle Style Sheet task(s)
// Generates styleguide documentation based on stylesheet comments
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('styleguide', {
    options: {

      framework: {
        name: 'kss'
      },

      name: 'Style Guide',

      template: {
        src: '<%= snippod.client %>/docs/styleguide'
      }

    },
    server: {
      files: {
        '<%= snippod.tmp %>/docs/styleguide': [
          '<%= snippod.tmp %>/styles/**/*.css'
        ]
      }
    },
    dist: {
      files: {
        '<%= snippod.dist %>/client/docs/styleguide': [
          '<%= snippod.dist %>/client/styles/**/*.css'
        ]
      }
    }
  });

};

module.exports = taskConfig;

