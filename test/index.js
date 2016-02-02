/**
 * Imports
 */

var middleware = require('..')
var test = require('tape')
var pipe = require('ramda').pipe
var compose = require('ramda').compose

/**
 * Tests
 */

test('should compose assembled middlware stack', function (t) {
  var fn = middleware(composePipe)
  fn.use(Math.pow)
    .use(function (arg) {
      return -arg
    })
    .use(function (arg) {
      return arg + 1
    })
  t.equal(fn(2, 4), -15)
  t.end()
})

test('should throw error if additions after call', function (t) {
  var fn = middleware(composePipe)
  fn.use(Math.pow)
    .use(function (arg) {
      return -arg
    })

  t.equal(fn(2, 4), -16)
  t.throws(function () {
    fn.use(function (arg) {
      return arg + 1
    })
  })
  t.end()
})

test('should add immutably', function (t) {
  var fn = middleware(composePipe)
  var pow = fn.add(Math.pow)
  var negPow = pow.add(function (arg) {
    return -arg
  })
  t.equal(pow(2, 4), 16)
  t.equal(negPow(2, 4), -16)
  t.end()
})

test('should copy stack', function (t) {
  var fn = middleware(composePipe)
  fn.use(function (arg) {
    return arg + 1
  })
  fn.use(function (arg) {
    return arg - 1
  })
  t.equal(fn(0), 0)
  var c = fn.copy()
  t.notEqual(c, fn)
  t.equal(c(0), 0)
  t.end()
})

test('should map stack', function (t) {
  var fn = middleware(composePipe)
  fn.use(identity)
  fn.use(identity)
  var mapped = fn.map(addOne)

  t.equal(fn(1), 1)
  t.equal(mapped(1), 3)
  t.end()

  function identity (arg) {
    return arg
  }

  function addOne (fn) {
    return function (arg) {
      return fn(arg) + 1
    }
  }
})

test('should replace compose function', function (t) {
  var fn = middleware(composePipe)
  fn.use(function (arg) {
    return arg * 2
  })
  fn.use(function (arg) {
    return arg + 1
  })
  fn.replace(simpleCompose)

  t.equal(fn(1), 4)
  t.end()
})

function composePipe (middleware) {
  return pipe.apply(null, middleware)
}

function simpleCompose(middleware) {
  return compose.apply(null, middleware)
}
