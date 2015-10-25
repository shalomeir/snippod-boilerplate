// Configuration for Watch task(s)
// Runs specified tasks when file changes are detected
'use strict';

var _ = require('lodash');

var taskConfig = function(grunt) {

  var config = {
    configFiles: {
      files: [
        'Gruntfile.js',
        'grunt/**/*.js',
        '*.json'
      ],
      options: {
        reload: true,
        interrupt: true
      },
      tasks: [
        'wiredep',
        'serve:nowatch'
      ]
    },
    sass: {
      files: ['<%= snippod.client %>/styles/**/*.{scss,sass,md}'],
      tasks: [
        'injector:sass',
        'sass:server',
        'autoprefixer:server'
      ]
    },
    injectCss: {
      files: [
        '<%= snippod.client %>/styles/**/*.css'
      ],
      tasks: [
        'injector:css',
        'autoprefixer:server'
      ]
    },
    js: {
      files: [
        '<%= snippod.client %>/scripts/**/*.js'
      ],
      tasks: [
        'newer:jshint'
      ]
    },
    livereload: {
      options: {
        livereload: true
      },
      files: [
        '<%= snippod.client %>/*.{ico,png,txt}',
        '<%= snippod.client %>/**/*.html',
        '<%= snippod.tmp %>/styles/**/*.{css,ttf,otf,woff,svg,eot}',
        '<%= snippod.tmp %>/scripts/**/*.js',
        '<%= snippod.tmp %>/templates/**/*.js',
        '<%= snippod.client %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    },
    express: {
      files: [
        'server.js',
        'server/**/*.{js,json,html}'
      ],
      tasks: [
        'express:server',
        'wait'
      ],
      options: {
        livereload: true,
        nospawn: true //Without this option specified express won't be reloaded
      }
    }
  };

  // Documentation specific configuration
  var docsConfig = {
    sass: {
      tasks: [
        'styleguide:server'
      ]
    },
    js: {
      files: [
        'README.md'
      ],
      tasks: [
        'jsdoc:server'
      ]
    },
    react: {
      tasks: [
        'jsdoc:server'
      ]
    },
    kss: {
      files: [
        '<%= snippod.client %>/docs/styleguide/**/*.*'
      ],
      tasks: ['styleguide:server']
    },
  };

  grunt.config.set('watch', config);

  grunt.registerTask('listen:docs', function() {
    // Merge docsConfig object with the config object without overwriting arrays
    // Instead concatenate all arrays with each other
    grunt.config('watch', _.merge(config, docsConfig, function(a, b) {
      return _.isArray(a) ? a.concat(b) : undefined;
    }));
    grunt.task.run('watch');
  });


};

module.exports = taskConfig;
