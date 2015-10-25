// Configuration for JSDoc task(s)
// Generates jsdoc api documentation based on JS comments
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('jsdoc', {
    server : {
      src: ['<%= snippod.client %>/scripts/**/*', '*.md'],
      dest: '<%= snippod.tmp %>/docs/api',
      options: {
        template : '<%= snippod.client %>/docs/api/theme'
      }
    },
    dist : {
      src: ['<%= snippod.client %>/scripts/**/*', '*.md'],
      dest: '<%= snippod.dist %>/client/docs/api',
      options: {
        template : '<%= snippod.client %>/docs/api/theme'
      }
    }
  });

};

module.exports = taskConfig;
