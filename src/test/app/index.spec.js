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

    it('should create a Gruntfile', () => {
        assert.file('Gruntfile.js');
    });
});