
function slow(x) {
  // there can be a heave CPU-intensive job here
  console.log(`Called with ${x}`)
  return x
}

function cachingDecorator(func) {
  let cache = new Map()

  return function (x) {
    if (cache.has(x)) { // if the result is in the map
      return cache.get(x)
    }
    let result = func(x)

    // corresponding to a value, there is a function
    cache.set(x, result)
    return result
  }
}

let someVerySlowFunc = cachingDecorator(slow)

console.log(someVerySlowFunc(1))
console.log('Again: ' + someVerySlowFunc(1)) // the same

console.log(someVerySlowFunc(2)) // slow(2) is cached
console.log('Again: ' + someVerySlowFunc(2))


