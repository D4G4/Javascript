function sayHi() {
  console.log('Hello')
}


function callSetTimeout() {
  console.log('starting')
  let timerId = setTimeout(sayHi, 6000)
  console.log('clearing')
  setTimeout(() => {
    let timeInMillis = new Date().getTime()
    console.log('date in milli seconds = ' + timeInMillis)
    if (timeInMillis % 2 === 0) {
      clearTimeout(timerId)
      console.log('just cleared the damm timer!!')
    } else {
      console.log('nope, I didn\'t clear it!')
    }
  }, 2000)
  console.log('what did u see?')
}
// callSetTimeout()


// ------------------ Set Interval ---------------------------------------------
function callSetInterval() {
  let intervalId = setInterval(() => console.log('tick'), 2000)

  // after 5 seconds, stop
  setTimeout(() => {
    clearInterval(intervalId)
    console.log('stopped')
  }, 5000)
}
// callSetInterval()

// Alternative to setInterval is Recursive setTimeout
// Recursive setTimeout guarantees a delay between the executions, 
// setInterval – does not.
function callRecursiveSetTimeout() {
  // eslint-disable-next-line space-before-function-paren
  let timeObj = new Date()
  let someTime = timeObj.getTime()
  timeObj = new Date(timeObj.getTime() + (1000 * 10))
  let futureTimeInMillis = timeObj.getTime()
  let timerId = setTimeout(function tick() {
    console.log('tick')
    timerId = setTimeout(() => {
      let abhiKaTime = new Date().getTime()
      if (abhiKaTime > futureTimeInMillis) {
        console.log('clearing')
        clearTimeout(timerId)
      } else {
        tick()
      }
    }, 1000)
    // eslint-disable-next-line no-trailing-spaces

  }, 1000)
}
// callRecursiveSetTimeout()



// ------------------ setTimeout(..., 0) ---------------------------------------------
function callSetTimeout0() {
  console.log('1')
  setTimeout(() => console.log('2'))
  console.log('3')
  console.log('4')
  console.log('5')
  for (let i = 0; i < 1e3; i++) {
    console.log(i)
  }
}

// callSetTimeout0()



// ------------------ Splitting CPU-hungry tasks ---------------------------------------------
function withoutSplitting() {
  let i = 0
  let start = Date.now()

  function count() {
    for (let j = 0; j < 1e9; j++) {
      i++
    }
    console.log(`Done in ${(Date.now() - start)} ms`)
  }
  count()
}
withoutSplitting()

function splitCPUIntensiveTask() {
  let i = 4

  let start = Date.now()

  function count() {
    // do a piece of the heavy job
    do {
      i++
    } while (i % 1e6 !== 0)
    if (i === 1e9) {
      console.log(`Done in ${(Date.now() - start)} ms`)
    } else {
      setTimeout(count) // schedule the new call
    }
  }
  count()
}

splitCPUIntensiveTask()