'use strict';

import {equal} from 'assert';

import {<%= appname %>} from '<%= target.test.split("/").filter(function(e) { return e !== "." && e }).map(function() {return ".."}).join("/").slice(0,-1) + target.main %>index';

describe('<%= appname %>', () => {
    it('should greet', () => {
        equal((new <%= appname %>()).hi(), 'Hello World!');
    });
});