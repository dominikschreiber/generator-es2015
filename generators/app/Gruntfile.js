'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Gruntfile = (function () {
    function Gruntfile(gruntfile, choices) {
        _classCallCheck(this, Gruntfile);

        this.gruntfile = gruntfile;
        this.choices = choices;
    }

    _createClass(Gruntfile, [{
        key: 'createConfig',
        value: function createConfig() {
            var config = new Map();

            config.set('clean', this._createConfigClean());
            config.set('jshint', this._createConfigJshint());
            config.set('babel', this._createConfigBabel());
            config.set('copy', this._createConfigCopy());
            config.set('mocha_istanbul', this._createConfigMocha());
            config.set('watch', this._createConfigWatch());

            return config;
        }
    }, {
        key: '_createConfigClean',
        value: function _createConfigClean() {
            return ['<%= babel.compile.dest %>', '<%= babel.testCompile.dest %>', './tmp'];
        }
    }, {
        key: '_createConfigJshint',
        value: function _createConfigJshint() {
            return {
                all: ['<%= babel.compile.src.map(function(s) { return babel.compile.cwd + "/" + s }) %>', '<%= babel.testCompile.src.map(function(s) { return babel.testCompile.cwd + "/" + s }) %>', './Gruntfile.js'],
                options: {
                    jshintrc: './.jshintrc'
                }
            };
        }
    }, {
        key: '_createConfigBabel',
        value: function _createConfigBabel() {
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
    }, {
        key: '_createConfigCopy',
        value: function _createConfigCopy() {
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
    }, {
        key: '_createConfigMocha',
        value: function _createConfigMocha() {
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
    }, {
        key: '_createConfigWatch',
        value: function _createConfigWatch() {
            var _this = this;

            return {
                sources: {
                    files: Object.keys(this.choices.src).map(function (k) {
                        return '' + _this.choices.src[k] + '**/*.js';
                    }),
                    tasks: ['test']
                }
            };
        }
    }, {
        key: 'createLifecycle',
        value: function createLifecycle() {
            var lifecycle = new Map();

            lifecycle.set('validate-only', ['jshint']);
            lifecycle.set('validate', ['validate-only']);
            lifecycle.set('compile-only', ['babel', 'copy']);
            lifecycle.set('compile', ['validate', 'compile-only']);
            lifecycle.set('test-only', ['mocha_istanbul']);
            lifecycle.set('test', ['compile', 'test-only']);
            lifecycle.set('install', ['test']);
            lifecycle.set('default', ['clean', 'install']);
            lifecycle.set('serve-only', ['watch']);
            lifecycle.set('serve', ['clean', 'serve-only']);

            return lifecycle;
        }
    }, {
        key: 'save',
        value: function save() {
            this.gruntfile.prependJavaScript('require("load-grunt-tasks")(grunt)');
            this.gruntfile.prependJavaScript('grunt.event.on("coverage", function(lcov, done) { require("coveralls").handleInput(lcov, function(err) { if (err) { return done(err); } done(); }); });');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.createConfig().entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var task = _step$value[0];
                    var config = _step$value[1];

                    this.gruntfile.insertConfig(task, JSON.stringify(config));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.createLifecycle().entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var step = _step2$value[0];
                    var tasks = _step2$value[1];

                    this.gruntfile.registerTask(step, tasks);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return Gruntfile;
})();

exports.Gruntfile = Gruntfile;
