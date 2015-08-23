"use strict";
module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "public/js/script.js": ["_/components/js/*.js"]
        } //files
      } //target
    }, //uglify
    compass: {
      dev: {
        options: {
          config: "config.rb"
        } //option
      } //dev
    }, //compass
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: ["server.js", "config/*", "app/*"],
        options: {
          spawn: false
        },
        tasks: ["express"]
      },
      scripts: {
        files: ["_/components/js/*.js"],
        tasks: ["uglify"]
      }, //script
      sass: {
        files: ["_/components/sass/*.scss"],
        tasks: ["compass:dev"]
      } //sass
    },
    express: {
      all: {
        options: {
          script: "server.js",
          port: 3000,
          hostname: "127.0.0.1",
          bases: ["dist/"],
          livereload: true
        }
      }
    }
  }); //initconfi
  grunt.registerTask("default", ["express", "watch"]);
}; //export
