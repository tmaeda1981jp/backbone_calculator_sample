/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // exec
    exec: {
      testjs: {
        command: 'mocha-phantomjs test/spec_runner.html'
      }
    },

    // watch
    watch: {
      js: {
        files: [
          'main.js',
          './collections/**/*.js',
          './utils/**/*.js',
          './views/**/*.js',
          './models/**/*.js',
          './exceptions/**/*.js',
          './viewmodels/**/*.js',
          './test/specs/**/*.js',
          './test/main.js'
        ],
        tasks: ['exec:testjs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
};
