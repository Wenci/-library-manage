
module.exports = function(grunt){

  require('load-grunt-tasks')(grunt);

  var lrPort = 35729;
  var lrSnippet = require('connect-livereload')({port:lrPort});
  var lrMiddleware = function(connect,options){
     return [
          lrSnippet,
          connect.static(String(options.base)),
          connect.directory(String(options.base))
        ];
  }

  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    connect:{
      options:{
              port:8000,
              hostname:'localhost',
              base:'.'
       },
       livereload:{
            options:{
                middleware:lrMiddleware
            }
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

    //复制一些不需要压缩代码

    copy:{
      jquery: {
        files: [
          {
            src: 'public/components/jquery/dist/jquery.min.js',
            dest: 'build/components/jquery/jquery.min.js'
          },
        ],
      },
      img:{
        files:[
          {
            expand:true,
            cwd: 'public/img',
            src: ['**/*'],
            dest: 'build/img'
          }
        ]
      },
      bootstrap:{
        files:[
          {
            src: 'public/components/bootstrap/dist/css/bootstrap.min.css',
            dest: 'build/components/bootstrap/css/bootstrap.min.css'
          },
          {
            src: 'public/components/bootstrap/dist/js/bootstrap.min.js',
            dest: 'build/components/bootstrap/js/bootstrap.min.js'
          }
        ]
      },
    },

    //CSS前缀补全
    autoprefixer: {
      css:{
        src:['public/css/**/*.css']
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

    //watch
    watch: {
      js: {
        options: {
          livereload: lrPort
        },
        files: ['public/js/*.js'],
        tasks: ['uglify']
      },
      css: {
        options: {
          livereload: lrPort
        },
        files: ['public/css/*.css'],
        tasks: ['autoprefixer','cssmin']
      },
      html:{
        options:{
          livereload:lrPort
        },
        files: ['html/**/*.html']
      }
    }

  });

  grunt.registerTask('default',['autoprefixer','cssmin','copy','uglify']);
  grunt.registerTask('live',['autoprefixer','cssmin','copy','uglify','connect','watch']);

}