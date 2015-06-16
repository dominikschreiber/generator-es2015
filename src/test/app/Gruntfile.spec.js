'use strict';

import 'babel/polyfill';

import {ok} from 'assert';
import {includes} from 'lodash';

import {Gruntfile} from '../../generators/app/Gruntfile';

class Mock {
    constructor() {
        this.file = {};
    }
    insertConfig(task, config) {
        this.file[task] = config;
    }

    gruntfile() {
        return this.file;
    }
}

describe('Gruntfile', () => {
    let gruntfile;
    
    before(() => {
        gruntfile = new Gruntfile(new Mock(), {
            appname: 'TestApp',
            src: { main: './src/main/', test: './src/test/' },
            target: { main: './lib/', test: './test/' }
        });
        gruntfile.save();
    });

    ['clean', 'jshint', 'babel', 'copy', 'mocha_istanbul', 'istanbul_check_coverage'].forEach(task => {
        it (`should add a ${task} task`, () => {
            for (let [k, v] of gruntfile.createConfig()) if (task === k) ok(true);
        });
    })
});