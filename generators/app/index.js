'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
            var withTrailingSlash = function withTrailingSlash(path) {
                return path.slice(-1) === '/' ? path : '' + path + '/';
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
                'default': 'lib/'
            }, {
                type: 'input',
                name: 'testtarget',
                message: 'the generated tests target',
                'default': 'test/'
            }, {
                type: 'input',
                name: 'src',
                message: 'the source files',
                'default': 'src/main/'
            }, {
                type: 'input',
                name: 'testsrc',
                message: 'the test files',
                'default': 'src/test/'
            }], function (answers) {
                _this.choices = {
                    appname: answers.appname,
                    src: { main: withTrailingSlash(answers.src), test: withTrailingSlash(answers.testsrc) },
                    target: { main: withTrailingSlash(answers.target), test: withTrailingSlash(answers.testtarget) }
                };

                console.log(_this.choices);

                done();
            });
        }
    }, {
        key: 'writing',
        value: function writing() {
            new _Gruntfile.Gruntfile(this.gruntfile, this.choices).save();

            this.fs.copyTpl(this.templatePath('.jshintrc'), this.destinationPath('.jshintrc'), this.choices);
            this.fs.copyTpl(this.templatePath('src/main/index.js'), this.destinationPath('' + this.choices.src.main + 'index.js'), this.choices);
            this.fs.copyTpl(this.templatePath('src/test/index.spec.js'), this.destinationPath('' + this.choices.src.test + 'index.spec.js'), this.choices);
        }
    }]);

    return Generator;
})(_yeomanGenerator.Base);

exports['default'] = Generator;
module.exports = exports['default'];
