// Configuration for Clean task(s)
// Deletes specified folders/files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('clean', {
    dist: ['<%= snippod.dist %>'],
    tmp: ['<%= snippod.tmp %>']
  });

};

module.exports = taskConfig;
