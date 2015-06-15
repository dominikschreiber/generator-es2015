'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // ===== clean ==============================================
        clean: ['./generators', './test'],

        // ===== compile ============================================
        babel: {
            compile: {
                expand: true,
                src: '**/*.js',
                dest: './generators',
                cwd: './src/main'
            },
            testCompile: {
                expand: true,
                src: '**/*.js',
                dest: './test',
                cwd: './src/test'
            }
        },

        // ===== test ===============================================
        mochaIstanbul: {
            coverage: {
                src: '<%= babel.testCompile.dest %>',
                options: {
                    mask: '*.spec.js',
                    check: {
                        lines: 80,
                        statements: 80
                    },
                    root: './generators',
                    reportFormats: ['cobertura', 'lcovonly']
                }
            }
        },

        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage',
                    check: {
                        lines: '<%= mochaIstanbul.coverage.options.check.lines %>',
                        statements: '<%= mochaIstanbul.coverage.options.check.statements %>'
                    }
                }
            }
        }
    });

    grunt.registerTask('compile-only', []);
    grunt.registerTask('compile', ['clean', 'compile-only']);

    grunt.registerTask('test-only', []);
    grunt.registerTask('test', ['compile', 'test-only']);

    grunt.registerTask('install-only', []);
    grunt.registerTask('install', ['test', 'install-only']);

    grunt.registerTask('default', ['install']);
};