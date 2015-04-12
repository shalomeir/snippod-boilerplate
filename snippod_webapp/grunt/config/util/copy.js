// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    server: {
      files: [{
         expand: true,
          cwd: '<%= snippod.client %>/',
          dest: '<%= snippod.tmp %>',
          src: [
            'styles/styleguide.md'
          ]
        }]
    },
    dist: {
      files: [{
        expand: true,
        cwd: '<%= snippod.client %>/',
        dest: '<%= snippod.dist %>/client/',
        src: [
          'styles/styleguide.md',
          'docs/styleguide/public/images',
          'styles/fonts/**/*.{woff,otf,ttf,eot,svg}',
          'images/**/*.{webp}',
          '!*.js',
          '*.{ico,png,txt}',
          '*.html'
        ]
      }, {
        expand: true,
        cwd: '<%= snippod.server %>/templates/',
        dest: '<%= snippod.tmp %>',
        src: [
          'index.html'
        ]
      }, {
        expand: true,
        cwd: './',
        dest: '<%= snippod.dist %>/',
        src: [
          '<%= snippod.server %>/**/*',
          'server.js',
          'package.json'
        ]
      }]
    }
  });

};

module.exports = taskConfig;
