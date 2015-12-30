
# middleware

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Utility for middleware composition.

## Installation

    $ npm install @f/middleware

## Usage

```js
var middleware = require('@f/middleware')
var pipe = require('ramda').pipe

var powAdd = middleware(composePipe)
  .use(Math.pow)
  .use(function (arg) {
    return arg + 1
  })

powAdd(2, 4) // => 17

var powAddMultiply = powAdd.add(function (arg) {
  return arg * 2
})

powAddMultiply(2, 4) // => 34

function composePipe(stack) {
  return pipe.apply(null, stack)
}
```

## API

### middleware(compose, stack)

- `compose` - compose function with signature `compose(stack)`
- `stack` - array of middleware

**Returns:** A function representing the composition of the stack. The composed
function additionally has helper properties for manipulating the stack.

 - **.use(fn)**: adds `fn` to `stack`
 - **.add(fn)**: immutably add `fn` to `stack`
 - **.copy(fn)**: make copy of stack return new composed function
 - **.map(fn)**: map stack over `fn` and return new composed function

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/middleware.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/middleware
[git-image]: https://img.shields.io/github/tag/micro-js/middleware.svg
[git-url]: https://github.com/micro-js/middleware
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/middleware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/middleware
