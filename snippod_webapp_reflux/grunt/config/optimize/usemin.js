// Configuration for Usemin task(s)
// Reads base template for usemin blocks to enable smart builds that automatically
// concat and minify files.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('useminPrepare', {
    html: '<%= snippod.client %>/index.html',
    options: {
      root: '<%= snippod.client %>',
      dest: '<%= snippod.dist %>/client'
    }
  });

  grunt.config.set('usemin', {
    html: '<%= snippod.dist %>/client/*.html',
    options: {
      assetsDirs: ['<%= snippod.client %>', '<%= snippod.client %>/images']
    }
  });

};

module.exports = taskConfig;
