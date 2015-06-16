'use strict';

import 'babel/polyfill';

import {Base} from 'yeoman-generator';
import {readdir} from 'fs';

import {Gruntfile} from './Gruntfile';

export default class Generator extends Base {
    constructor(...args) {
        super(...args);
    }

    prompting() {
        const done = this.async();

        this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'your project name',
            default: this.appname
        }], answers => {
            this.answers = answers;
            done();
        });
    }

    writing() {
        new Gruntfile(this.gruntfile).save();
    }
}