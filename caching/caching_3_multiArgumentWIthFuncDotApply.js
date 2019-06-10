function oldCachingDecorator(func) {
  let cache = new Map()
  return function (input) {
    if (cache.has(input)) {
      return cache.get(input)
    }
    let result = func.call(this, input)
    cache.set(input, result)
    return result
  }
}

// Let's make cachingDecorator more universal
function sleep(milliseconds) {
  var e = new Date().getTime() + milliseconds
  console.log('waiting')
  while (new Date().getTime() <= e) {
  }
  console.log(':]')
}

let worker = {
  someMethod() {
    console.log('called some method')
    return 1
  },
  slow() {
    console.log('scary CPU-hogger is process is running')
    console.log(arguments)
    sleep(1000)
    let sum = 0
    for (let val of arguments) {
      sum += val
    }
    return sum // scary CPU-hogger is assumed
  },
  oldSlow(input) {
    return this.someMethod() * input
  }
}

// should remember same-argument calls
worker.oldSlow = oldCachingDecorator(worker.oldSlow)

console.log(worker.oldSlow(1))
console.log(worker.oldSlow(1))




// ------------------ Function.apply(context, args) ---------------------------------------------
function say(time, phrase) {
  console.log(`[${time}] ${this.name}: ${phrase}`)
}

let user = { name: 'john' }
let messageData = ['10:00', 'Hello!']

say.apply(user, messageData)
say.call(user, ...messageData)  // or use spread operator

/*
The only difference between `call()` and `apply()` is that
`call()` accepts list of arguments i.e. comma separated &
`apply()` accepts array like object
 */


// ------------------ Call forwarding ---------------------------------------------
/*
 let wrapper = function() {
   return anotherFunction.apply(this, arguments)
 }
 */
function cachingDecorator(func) {
  let cache = new Map()
  return function () {
    let key = hashUsingBorrowing(...arguments)
    if (cache.has(key)) {
      return cache.get(key)
    }
    // let result = func.apply(this, arguments)
    let result = func.call(this, ...arguments)
    cache.set(key, result)
    return result
  }

  function hash() {
    return arguments[0] + ':' + arguments[1]
  }

  function hashUsingBorrowing() {
    let key = [].join.call(arguments)
    console.log('returning key ' + key)
    return key
  }
}

worker.slow = cachingDecorator(worker.slow)
console.log(worker.slow(3, 4))
console.log(worker.slow(3, 4))
console.log(worker.slow(3, 5, 1))
console.log(worker.slow(3, 5, 1))