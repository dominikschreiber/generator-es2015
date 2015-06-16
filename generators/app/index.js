'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

require('babel/polyfill');

var _yeomanGenerator = require('yeoman-generator');

var _Gruntfile = require('./Gruntfile');

var Generator = (function (_Base) {
    function Generator() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, Generator);

        _get(Object.getPrototypeOf(Generator.prototype), 'constructor', this).apply(this, args);
    }

    _inherits(Generator, _Base);

    _createClass(Generator, [{
        key: 'prompting',
        value: function prompting() {
            var _this = this;

            var done = this.async();
            var withSlashes = function withSlashes(path) {
                var shouldPrepend = path.slice(0, 2) !== './';
                var shouldAppend = path.slice(-1) !== '/';

                return '' + (shouldPrepend ? './' : '') + '' + path + '' + (shouldAppend ? '/' : '');
            };

            this.prompt([{
                type: 'input',
                name: 'appname',
                message: 'your project name',
                'default': this.appname
            }, {
                type: 'input',
                name: 'target',
                message: 'the generated sources target',
                'default': './lib/'
            }, {
                type: 'input',
                name: 'testtarget',
                message: 'the generated tests target',
                'default': './test/'
            }, {
                type: 'input',
                name: 'src',
                message: 'the source files',
                'default': './src/main/'
            }, {
                type: 'input',
                name: 'testsrc',
                message: 'the test files',
                'default': './src/test/'
            }], function (answers) {
                _this.choices = {
                    appname: answers.appname,
                    src: { main: withSlashes(answers.src), test: withSlashes(answers.testsrc) },
                    target: { main: withSlashes(answers.target), test: withSlashes(answers.testtarget) }
                };

                done();
            });
        }
    }, {
        key: 'writing',
        value: function writing() {
            var templates = new Map();
            templates.set('package.json', 'package.json');
            templates.set('bower.json', 'bower.json');
            templates.set('.jshintrc', '.jshintrc');
            templates.set('src/main/index.js', '' + this.choices.src.main + 'index.js');
            templates.set('src/test/index.spec.js', '' + this.choices.src.test + 'index.spec.js');

            new _Gruntfile.Gruntfile(this.gruntfile, this.choices).save();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = templates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var template = _step$value[0];
                    var destination = _step$value[1];

                    this.fs.copyTpl(this.templatePath(template), this.destinationPath(destination), this.choices);
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
    }, {
        key: 'install',
        value: function install() {
            this.installDependencies();
        }
    }]);

    return Generator;
})(_yeomanGenerator.Base);

exports['default'] = Generator;
module.exports = exports['default'];
