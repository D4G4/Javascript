// we'll make worker.slow caching
let worker = {
  someMethod() {
    console.log('inside someMethod()')
    return 1
  },

  slow(x) {
    // actually, there can be a scary CPI-intensive task here
    console.log('Called with ' + x)
    return x * this.someMethod() // (*)
  }
}

// same code as before
function cachingDetector(func) {
  let cache = new Map()
  return function (inputValue) {
    if (cache.has(inputValue)) {
      return cache.get(inputValue)
    }
    let result = func(inputValue) // (**)
    cache.set(inputValue, result)
    return result
  }
}

// console.log(worker.slow(1)) // the original method works
// worker.slow = cachingDetector(worker.slow) // now make it caching
// console.log(worker.slow(2)) // Error: Cannot read property 'someMethod' of undefined

/*
 Explanation of the error:
 The (*) tries to access `this.someMethod` and it fails:
 Wrapper calls the orignal function as func(x) in the line (**)
 And, when it called like that, the function gets `this = undefined`

 Similar sympton if we would have tried this:
  _________________________
 |                         |
 | let func = worker.slow  |
 | func(2)                 |
 |_________________________|
 */

// There's a specail built-in functuon method `func.call(context, ...args)` 
// that allows to call a funciton explicitly setting up `this`
// example:
function sayHi() {
  console.log(this.name)
}

let user = { name: 'John' }
let admin = { name: 'Admin' }

/*
sayHi.call(user) // John
sayHi.call(admin) // Admin
sayHi() // undefined
*/

// going back to the above problem

function cachingDecoratorFixed(func) {
  let cache = new Map()
  return function(inputValue) {
    if (cache.has(inputValue)) {
      return cache.get(inputValue)
    }
    let result = func.call(this, inputValue)
    cache.set(inputValue, result)
    return result
  }
}

console.log(worker.slow(1)) // the original method works
worker.slow = cachingDecoratorFixed(worker.slow) // now make it caching
console.log(worker.slow(2)) 
console.log(worker.slow(2)) 
