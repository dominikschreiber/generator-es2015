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
        const withSlashes = path => {
            let shouldPrepend = path.slice(0,2) !== './';
            let shouldAppend = path.slice(-1) !== '/';

            return `${shouldPrepend ? './' : ''}${path}${shouldAppend ? '/' : ''}`;
        };

        this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'your project name',
            default: this.appname
        }, {
            type: 'input',
            name: 'target',
            message: 'the generated sources target',
            default: './lib/'
        }, {
            type: 'input',
            name: 'testtarget',
            message: 'the generated tests target',
            default: './test/'
        }, {
            type: 'input',
            name: 'src',
            message: 'the source files',
            default: './src/main/'
        }, {
            type: 'input',
            name: 'testsrc',
            message: 'the test files',
            default: './src/test/'
        }], answers => {
            this.choices = {
                appname: answers.appname,
                src: { main: withSlashes(answers.src), test: withSlashes(answers.testsrc) },
                target: { main: withSlashes(answers.target), test: withSlashes(answers.testtarget) }
            };

            done();
        });
    }

    writing() {
        let templates = new Map();
        templates.set('package.json', 'package.json');
        templates.set('bower.json', 'bower.json');
        templates.set('.jshintrc', '.jshintrc');
        templates.set('src/main/index.js', `${this.choices.src.main}index.js`);
        templates.set('src/test/index.spec.js', `${this.choices.src.test}index.spec.js`);

        new Gruntfile(this.gruntfile, this.choices).save();
        for (let [template, destination] of templates) {
            this.fs.copyTpl(this.templatePath(template), this.destinationPath(destination), this.choices);
        }
    }

    install() {
        this.installDependencies();
    }
}