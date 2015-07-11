'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },

    //js代码压缩
    uglify:{
      js: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['**/*.js','!components/**'],
            dest: 'build/',
            ext: '.min.js',
            extDot:'last'
          },
        ]
      }
    },

    //CSS压缩

    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.css', '!components/**'],
          dest: 'build/',
          ext: '.min.css',
          extDot: 'first'
        }]
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/**/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      base: {
        files: ['base/**/*.js'],
        tasks: ['develop', 'delayed-livereload']
      },
      //
      js: {
        options: {
          livereload: reloadPort
        },
        files: ['public/js/*.js'],
        tasks: ['uglify']
      },
      css: {
        options: {
          livereload: reloadPort
        },
        files: ['public/css/*.css'],
        tasks: ['cssmin']
      },
      //
      views: {
        files: ['views/*.ejs'],
        options: {
          livereload: reloadPort
        }
      },
      testView: {
        files: ['testViews/*.ejs'],
        options: {
          livereload: reloadPort
        }
      },
      dao: {
        files: ['dao/**/*.js'],
        tasks: ['develop', 'delayed-livereload']
      },
      config: {
        files: ['fonfig/**/*'],
        tasks: ['develop', 'delayed-livereload']
      },
      log: {
        files: ['log/*.js'],
        tasks: ['develop', 'delayed-livereload']
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
};
