'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

    });

    grunt.registerTask('compile-only', []);
    grunt.registerTask('compile', ['clean', 'compile-only']);

    grunt.registerTask('test-only', []);
    grunt.registerTask('test', ['compile', 'test-only']);

    grunt.registerTask('install-only', []);
    grunt.registerTask('install', ['test', 'install-only']);

    grunt.registerTask('default', ['install']);
};