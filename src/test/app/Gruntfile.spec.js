'use strict';

import 'babel/polyfill';

import {ok} from 'assert';

import {Gruntfile} from '../../generators/app/Gruntfile';

class Mock {
    constructor() {
        this.config = {};
        this.tasks = {};
        this.raw = '';
    }

    insertConfig(task, config) {
        this.config[task] = config;
    }

    registerTask(task, tasks) {
        this.tasks[task] = tasks;
    }

    prependJavaScript(script) {
        this.raw += script;
    }

    gruntfile() {
        return { config: this.config, tasks: this.tasks, raw: this.raw };
    }
}

describe('Gruntfile', () => {
    let gruntfile;
    const inMap = (haystack, needle) => {
        for (let k of haystack.keys()) { if (needle === k) { return true; }}
        return false;
    };
    
    before(() => {
        gruntfile = new Gruntfile(new Mock(), {
            appname: 'TestApp',
            src: { main: './src/main/', test: './src/test/' },
            target: { main: './lib/', test: './test/' }
        });
        gruntfile.save();
    });

    describe('tasks', () => {
        ['clean', 'jshint', 'babel', 'copy', 'mocha_istanbul', 'watch'].forEach(task => {
            it (`should add a ${task} task`, () => {
                ok(inMap(gruntfile.createConfig(), task));
            });
        });
    });

    describe('combined lifecycle', () => {
        ['validate', 'compile', 'test', 'install', 'default', 'serve'].forEach(lifecycle => {
            it (`should add ${lifecycle} to the combined lifecycle`, () => {
                ok(inMap(gruntfile.createLifecycle(), lifecycle));
            });
        });
    });

    describe('single-step lifecycle', () => {
        ['validate-only', 'compile-only', 'test-only', 'serve-only'].forEach(step => {
            it (`should add ${step} to the single-step lifecycle`, () => {
                ok(inMap(gruntfile.createLifecycle(), step));
            });
        });
    });
});