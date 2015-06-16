'use strict';

import 'babel/polyfill';

import {Base} from 'yeoman-generator';

import {Gruntfile} from './Gruntfile';

export default class Generator extends Base {
    constructor(...args) {
        super(...args);
    }

    prompting() {
        const done = this.async();
        const withTrailingSlash = path => (path.slice(-1) === '/') ? path : `${path}/`;

        this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'your project name',
            default: this.appname
        }, {
            type: 'input',
            name: 'target',
            message: 'the generated sources target',
            default: 'lib/'
        }, {
            type: 'input',
            name: 'testtarget',
            message: 'the generated tests target',
            default: 'test/'
        }, {
            type: 'input',
            name: 'src',
            message: 'the source files',
            default: 'src/main/'
        }, {
            type: 'input',
            name: 'testsrc',
            message: 'the test files',
            default: 'src/test/'
        }], answers => {
            this.choices = {
                appname: answers.appname,
                src: { main: withTrailingSlash(answers.src), test: withTrailingSlash(answers.testsrc) },
                target: { main: withTrailingSlash(answers.target), test: withTrailingSlash(answers.testtarget) }
            };

            done();
        });
    }

    writing() {
        new Gruntfile(this.gruntfile, this.choices).save();

        this.fs.copyTpl(this.templatePath('.jshintrc'), this.destinationPath('.jshintrc'), this.choices);
        this.fs.copyTpl(this.templatePath('src/main/index.js'), this.destinationPath(`${this.choices.src.main}index.js`), this.choices);
        this.fs.copyTpl(this.templatePath('src/test/index.spec.js'), this.destinationPath(`${this.choices.src.test}index.spec.js`), this.choices);
    }
}