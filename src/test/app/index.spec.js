'use strict';

import 'babel/polyfill';

import {assert, test as helpers} from 'yeoman-generator';
import {join} from 'path';

describe('app', () => {
    before(done => {
        helpers
            .run(join(__dirname, '../../generators/app'))
            .inDir(join(__dirname, '../../tmp'))
            .withPrompts({
                appname: 'TestApp'
            })
            .on('end', done);
    });

    ['./Gruntfile.js', './.jshintrc', './package.json', './bower.json', './src/main/index.js', './src/test/index.spec.js'].forEach(f => {
        it (`should create ${f}`, () => {
            assert.file(f);
        });
    });

    it('should create a meaningful index.js', () => {
        assert.fileContent('./src/main/index.js', /export class TestApp {/);
    });
});