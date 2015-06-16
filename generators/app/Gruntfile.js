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
        key: 'save',
        value: function save() {
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
        }
    }]);

    return Gruntfile;
})();

exports.Gruntfile = Gruntfile;
