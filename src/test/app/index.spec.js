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

    it('should create a Gruntfile.js in ./', () => {
        assert.file('./Gruntfile.js');
    });

    it('should create a .jshintrc in ./', () => {
        assert.file('./.jshintrc');
    });

    it('should create an index.js in ./src/main/', () => {
        assert.file('./src/main/index.js');
        assert.fileContent('./src/main/index.js', /export default class TestApp {/);
    });

    it('should create an index.spec.js in ./src/test/', () => {
        assert.file('./src/test/index.spec.js');
    });
});