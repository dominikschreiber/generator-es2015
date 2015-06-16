'use strict';

import {equal} from 'assert';

describe('<%= appname %>', () => {
    it('should compute 1+1=2', done => {
        equal(1 + 1, 2);
        done();
    });
});