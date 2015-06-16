'use strict';

export class Gruntfile {
    constructor(gruntfile, choices) {
        this.gruntfile = gruntfile;
        this.choices = choices;
    }

    createConfig() {
        let config = new Map();

        config.set('clean', this._createConfigClean());
        config.set('jshint', this._createConfigJshint());
        config.set('babel', this._createConfigBabel());
        config.set('copy', this._createConfigCopy());
        config.set('mocha_istanbul', this._createConfigMocha());
        config.set('watch', this._createConfigWatch());

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
                cwd: this.choices.src.main,
                src: ['**/*.js', '!*/templates/**/*'],
                dest: this.choices.target.main
            },
            testCompile: {
                expand: true,
                cwd: this.choices.src.test,
                src: ['**/*.js', '!*/fixtures/**/*'],
                dest: this.choices.target.test
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

    _createConfigWatch() {
        return {
            sources: {
                files: Object.keys(this.choices.src).map(k => `${this.choices.src[k]}**/*.js`),
                tasks: ['test']
            }
        };
    }

    createLifecycle() {
        let lifecycle = new Map();

        lifecycle.set('validate-only', ['jshint']);
        lifecycle.set('validate', ['validate-only']);
        lifecycle.set('compile-only', ['babel', 'copy']);
        lifecycle.set('compile', ['validate', 'compile-only']);
        lifecycle.set('test-only', ['mocha_istanbul']);
        lifecycle.set('test', ['compile', 'test-only']);
        lifecycle.set('install', ['test']);
        lifecycle.set('default', ['clean', 'install']);
        lifecycle.set('serve-only', ['watch']);
        lifecycle.set('serve', ['clean', 'serve-only']);

        return lifecycle;
    }

    save() {
        this.gruntfile.prependJavaScript('require("load-grunt-tasks")(grunt)');
        this.gruntfile.prependJavaScript('grunt.event.on("coverage", function(lcov, done) { require("coveralls").handleInput(lcov, function(err) { if (err) { return done(err); } done(); }); });');
        
        for (let [task, config] of this.createConfig().entries()) {
            this.gruntfile.insertConfig(task, JSON.stringify(config));
        }
        for (let [step, tasks] of this.createLifecycle().entries()) {
            this.gruntfile.registerTask(step, tasks);
        }
    }
}