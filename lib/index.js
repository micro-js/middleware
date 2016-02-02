/**
 * Modules
 */

var slice = require('@f/slice')

/**
 * Expose middleware
 */

module.exports = ware['default'] = ware

/**
 * Middleware stacking and composition utility.
 * @param  {Function} compose    Function used to compose middleware in stack.
 * @param  {Array} middleware Array of middleware.
 * @return {Function}            Composition of middleware stack.
 */

function ware (compose, middleware) {
  middleware = middleware || []
  var _composed = null

  /**
   * Composed middleware
   * @return {Function}
   */

  function composed () {
    if (!_composed) {
      _composed = compose(middleware)
    }
    return _composed.apply(this, slice(arguments))
  }

  /**
   * Mutably add middlware to stack.
   * @param  {Function} fn middleware to add
   * @return {Function}      this
   */

  composed.use = function (fn) {
    if (_composed) {
      throw new Error('Cannot add middleware after composed middleware is called.')
    }
    middleware.push(fn)
    return this
  }

  /**
   * Immutably add middleware to stack.
   * @param {Function} fn middleware to add
   * @return {Function} new compose function for new stack
   */

  composed.add = function (fn) {
    return ware(compose, middleware.concat(fn))
  }

  /**
   * Copy middlware stack
   * @return {Function}
   */

  composed.copy = function () {
    return ware(compose, slice(middleware))
  }

  /**
   * Map middleware stack
   * @param  {Function} fn mapping function
   * @return {Function}
   */

  composed.map = function (fn) {
    return ware(compose, middleware.map(fn))
  }

  /**
   * Replace the compose function
   * @param  {Function} fn new compose function
   * @return {Function}    this
   */
  
  composed.replace = function (fn) {
    compose = fn
    return this
  }

  return composed
}
