# generator-es2015

[![travis build](https://img.shields.io/travis/dominikschreiber/generator-es2015.svg?style=flat-square)](http://travis-ci.org/dominikschreiber/generator-es2015)
[![coveralls report](https://img.shields.io/coveralls/dominikschreiber/generator-es2015.svg?style=flat-square)](https://coveralls.io/r/dominikschreiber/generator-es2015)
[![npm package](https://img.shields.io/npm/v/generator-es2015.svg?style=flat-square)](https://npmjs.org/package/generator-es2015)
[![MIT license](https://img.shields.io/github/license/dominikschreiber/generator-es2015.svg?style=flat-square)](https://github.com/dominikschreiber/generator-es2015/blob/master/LICENSE)
[![twitter link](https://img.shields.io/badge/twitter-@domischreib-55acee.svg?style=flat-square)](https://twitter.com/@domischreib)

Generate ES2015 projects that transpile your code using
[BabelJS](https://babeljs.io) and can directly be tested with
[Mocha](http://mochajs.org) and [Istanbul](https://gotwarlost.github.io/istanbul).

## get started

This generator assumes you have *nodejs* and *npm* installed (get it at
[nodejs.org](https://nodejs.org/download)), as well as
[yeoman](https://yeoman.io) (get it with `[sudo] npm i -g yo`).

Install the es2015 generator globally to quickly start new projects
wherever you want:

```bash
[sudo] npm i -g generator-es2015
```

Then start the new project with

```bash
yo es2015
```

## the project

`yo es2015` creates a project where your es2015 sources are located in
`src/main` and the es2015 tests are located in `src/test`.

```bash
npm start
```

compiles everything from `src/main` to `lib/` and everything from
`src/test` to `test/`.

```bash
npm test
```

does the same but also runs the tests from `test/` against the generated
code in `app/` (so don't worry if you don't get 100% test coverage, babeljs
adds code to make your es2015 stuff happen in es5). 

## license

This project is [MIT-licensed](https://github.com/dominikschreiber/generator-es2015/blob/master/LICENSE).