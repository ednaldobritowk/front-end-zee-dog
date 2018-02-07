"use strict";

module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    watch: {
      images: {
        files: "assets/img/**/*.{png,jpg,gif}",
        tasks: ["imagemin"]
      },
      sass: {
        files: ['assets/scss/**/*.scss','bower_components/bootstrap/scss/**/*.scss'],
        tasks: ["sass", "cmq", "postcss", "cssmin"]
      },
      svg: {
        files: "assets/svg/**/*.svg",
        tasks: ["svgmin"]
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'compress/css/style.css' : 'assets/scss/style.scss',      
         }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: 'last 3 versions'
          })
        ]
      },
      dist: {
        src: [
          'compress/css/style.css',
        ]
      }
    },

    cmq: {
      options: {
        log: true
      },
      dist: {
        files: {
          'compress/css/style.css': 'compress/css/style.css',
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        noAdvanced: true,
        banner: ''
      },
      css: {
        files: {
          "style-site.css": "compress/css/style.css",
        }
      }
    },

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }, {
          removeEmptyAttrs: false
        }]
      },
      dist: {
        expand: true,
        cwd: 'assets/svg',
        src: '**/*.svg',
        dest: 'compress/svg'
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'compress/img/'
        }]
      }
    },

    devUpdate: {
      main: {
        options: {
          updateType: 'force',
          reportUpdated: false,
          semver: false,
          packages: {
            devDependencies: true,
            dependencies: false
          },
          packageJson: null,
          reportOnlyPkgs: []
        }
      }
    },

  });

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("css", ["sass", "cmq", "postcss", "cssmin"]);
  grunt.registerTask("img", ["imagemin"]);
  grunt.registerTask("svg", ["svgmin"]);
  grunt.registerTask("compile", ["sass", "cmq", "postcss", "cssmin", "imagemin", "concat", "svgmin"]);
  grunt.registerTask("update", ["devUpdate"]);

};
