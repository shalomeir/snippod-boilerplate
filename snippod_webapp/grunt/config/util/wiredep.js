// Configuration for Wiredep task(s)
// Injects Bower packages into your source code.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('wiredep', {
    app: {
      options: {
        ignorePath: /client\/|\.\.\//g,
        // Make sure everything has an absolute path (starts with '/')
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        },
        // packages to ignore
        exclude: [
          'bower_components/html5shiv/',
          'bower_components/consolelog/',
          'bower_components/modernizr/',
          'bower_components/es5-shim/'
        ],
        overrides: {
        }
      },
      src: [
        '<%= yeogurt.client %>/index.html'
      ]
    },
    styles: {
      src: ['<%= yeogurt.client %>/styles/**/*.{scss,sass}'],
      ignorePath: /client/g,
    }
  });

};

module.exports = taskConfig;
