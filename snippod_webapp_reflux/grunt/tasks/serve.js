// `grunt serve`
// Starts up a development server that watches for local file changes
// and automatically reloads them to the browser.

'use strict';

var taskConfig = function(grunt) {
  grunt.registerTask('serve', 'Open a development server within your browser', function(target) {
    // Allow for remote access to app/site via the 0.0.0.0 ip address
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }

    if (target === 'dist') {
      return grunt.task.run(['build',
      'env:all', 'env:prod', 'express:dist', 'open', 'keepalive']);
    }

    grunt.task.run([
      'clean:tmp',
      'env:all',
      'copy:server',
      'injector',
      'wiredep',
      'browserify:server',
      'sass:server',
      'styleguide:server',
      //'jsdoc:server',
      'autoprefixer:server'
    ]);

    if (target === 'nowatch') {
      return;
    }

    //For using intellij debug mode. I don't want to these automatically.
    //grunt.task.run([
    //  'express:server',
    //  'wait',
    //  'open'
    //]);


    if (target === 'docs') {
      return grunt.task.run(['listen:docs']);
    }

    return grunt.task.run(['watch']);

  });
};

module.exports = taskConfig;
