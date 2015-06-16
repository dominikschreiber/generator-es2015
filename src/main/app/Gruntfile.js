'use strict';

export class Gruntfile {
    constructor(gruntfile) {
        this.gruntfile = gruntfile;
    }

    createConfig() {
        let config = new Map();

        config.set('clean', this._createConfigClean());
        config.set('jshint', this._createConfigJshint());
        config.set('babel', this._createConfigBabel());
        config.set('copy', this._createConfigCopy());
        config.set('mocha_istanbul', this._createConfigMocha());

        return config;
    }

    _createConfigClean() {
        return ['<%= babel.compile.dest %>', '<%= babel.testCompile.dest %>', './tmp'];
    }

    _createConfigJshint() {
        return {
            all: [
                '<%= babel.compile.src.map(function(s) { return babel.compile.cwd + "/" + s }) %>',
                '<%= babel.testCompile.src.map(function(s) { return babel.testCompile.cwd + "/" + s }) %>',
                './Gruntfile.js'
            ],
            options: {
                jshintrc: './.jshintrc'
            }
        };
    }

    _createConfigBabel() {
        return {
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
        };
    }

    _createConfigCopy() {
        return {
            templates: {
                files: [{
                    expand: true,
                    cwd: '<%= babel.compile.cwd %>',
                    src: '<%= babel.compile.src[1].substring(1) %>',
                    dest: '<%= babel.compile.dest %>'
                }]
            },
            fixtures: {
                files: [{
                    expand: true,
                    cwd: '<%= babel.testCompile.cwd %>',
                    src: '<%= babel.testCompile.src[1].substring(1) %>',
                    dest: '<%= babel.testCompile.dest %>'
                }]
            }
        };
    }

    _createConfigMocha() {
        return {
            coverage: {
                src: '<%= babel.testCompile.dest %>',
                options: {
                    mask: '**/*.spec.js',
                    check: {
                        lines: 80,
                        statements: 80
                    },
                    root: '<%= babel.compile.dest %>',
                    reportFormats: ['cobertura', 'lcovonly']
                }
            }
        };
    }

    save() {
        for (let [task, config] of this.createConfig().entries()) {
            this.gruntfile.insertConfig(task, JSON.stringify(config));
        }
    }
}