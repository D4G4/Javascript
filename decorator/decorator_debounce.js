// This is more of a Leading edge (or "intermediate") debounce
// After triggering the event, 
// all the event within given timestamp will be ignored

/* 
  $ npm i -g lodash-cli
  $ lodash include = debounce, throttle
 */

/*
 ___jQuery_______________________________________________
|                                                        | 
|  // WRONG                                              |
|  $(window).on('scroll', function() {                   |
|    _.debounce(doSomething, 300);                       |
|  });                                                   | 
|                                                        |
|  // RIGHT                                              |      
|  $(window).on('scroll', _.debounce(doSomething, 200)); |
|________________________________________________________| 
 */

function debounce(func, milliseconds) { 
  let startTime = Date.now()
  console.log(`statTime = ${startTime}`)
  let nextValidIteration = startTime

  return function() {
    let now = Date.now()
    console.log('Diff = ' + (now - nextValidIteration))
    if (now >= nextValidIteration) {
      func(arguments[0])
      startTime = now
      nextValidIteration = startTime + milliseconds
      console.log(`nextValidIteration = ${nextValidIteration} \n`)
    } else {
      console.log(`ignoring ${arguments[0]} \n`)
    }
  }
}

function debounce2(func, milliseconds) { 
  let startTime = null
  let nextValidIteration = startTime

  return function() {
    let now = Date.now()
    console.log('Diff = ' + (now - nextValidIteration))
    if (startTime == null) {
      
      return 
    }
    if (now >= nextValidIteration) {
      func(arguments[0])
      startTime = now
      nextValidIteration = startTime + milliseconds
      console.log(`nextValidIteration = ${nextValidIteration} \n`)
    } else {
      console.log(`ignoring ${arguments[0]} \n`)
    }
  }
}



let f = debounce(console.log, 1000)

f(1)  // runs
f(2)  // ignored

setTimeout(() => f(3), 100) // ignored
setTimeout(() => f(4), 2000) // runs
setTimeout(() => f(5), 2500) // ignored
setTimeout(() => f(6), 3001) // runs



function debounceEquivalent(func, ms) {
  let isCooldown = false 
  return function() {
    if (isCooldown) return 
    func.apply(this, arguments)
    isCooldown = true 
    setTimeout(() => { isCooldown = false }, ms)
  }
}

// let f = debounceEquivalent(console.log, 1000)

// f(1)
// f(2)

// setTimeout(() => f(3), 100) 
// setTimeout(() => f(4), 2000) 
// setTimeout(() => f(5), 2500) 
// setTimeout(() => f(6), 3001) 
// setTimeout(() => f(7), 3010) 
