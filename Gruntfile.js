'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // ===== clean ==============================================
        clean: ['<%= babel.compile.dest %>', '<%= babel.testCompile.dest %>', './tmp'],

        // ===== jshint =============================================
        jshint: {
            all: [
                '<%= babel.compile.src.map(function(s) { return babel.compile.cwd + "/" + s }) %>',
                '<%= babel.testCompile.src.map(function(s) { return babel.testCompile.cwd + "/" + s }) %>',
                './Gruntfile.js'
            ],
            options: {
                jshintrc: './.jshintrc'
            }
        },

        // ===== compile ============================================
        babel: {
            compile: {
                expand: true,
                cwd: './src/main',
                src: ['**/*.js', '!*/templates/**/*'],
                dest: './generators'
            },
            testCompile: {
                expand: true,
                cwd: './src/test',
                src: ['**/*.js', '!*/fixtures/**/*'],
                dest: './test'
            }
        },

        copy: {
            templates: {
                files: [{
                    expand: true,
                    cwd: '<%= babel.compile.cwd %>',
                    src: '<%= babel.compile.src[1].substring(1) %>',
                    dest: '<%= babel.compile.dest %>',
                    dot: true
                }]
            },
            fixtures: {
                files: [{
                    expand: true,
                    cwd: '<%= babel.testCompile.cwd %>',
                    src: '<%= babel.testCompile.src[1].substring(1) %>',
                    dest: '<%= babel.testCompile.dest %>',
                    dot: true
                }]
            }
        },

        // ===== test ===============================================
        mocha_istanbul: {
            coverage: {
                src: '<%= babel.testCompile.dest %>',
                options: {
                    coverage: true,
                    mask: '**/*.spec.js',
                    check: {
                        lines: 70,
                        statements: 70
                    },
                    root: '<%= babel.compile.dest %>',
                    excludes: ['<%= babel.compile.src[1].substring(1) %>'],
                    reportFormats: ['cobertura', 'lcovonly'],
                }
            }
        },

        // ===== serve ==============================================
        watch: {
            sources: {
                files: './src/**/*.js',
                tasks: ['test']
            }
        }
    });

    grunt.event.on('coverage', function(lcov, done) {
        require('coveralls').handleInput(lcov, function(err) {
            if (err) { return done(err); }
            done();
        });
    });

    grunt.registerTask('validate-only', ['jshint']);
    grunt.registerTask('validate', ['validate-only']);

    grunt.registerTask('compile-only', ['babel', 'copy']);
    grunt.registerTask('compile', ['validate', 'compile-only']);

    grunt.registerTask('test-only', ['mocha_istanbul']);
    grunt.registerTask('test', ['compile', 'test-only']);

    grunt.registerTask('install-only', []);
    grunt.registerTask('install', ['test', 'install-only']);

    grunt.registerTask('default', ['clean', 'install']);
    grunt.registerTask('serve', ['clean', 'install', 'watch']);
};