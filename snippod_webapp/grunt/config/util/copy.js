// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    server: {
      files: [{
         expand: true,
          cwd: '<%= yeogurt.client %>/',
          dest: '<%= yeogurt.tmp %>',
          src: [
            'styles/styleguide.md'
          ]
        }]
    },
    dist: {
      files: [{
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/client/',
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
        cwd: '<%= yeogurt.server %>/templates/',
        dest: '<%= yeogurt.tmp %>',
        src: [
          'index.html'
        ]
      }, {
        expand: true,
        cwd: './',
        dest: '<%= yeogurt.dist %>/',
        src: [
          '<%= yeogurt.server %>/**/*',
          'server.js',
          'package.json'
        ]
      }]
    }
  });

};

module.exports = taskConfig;
