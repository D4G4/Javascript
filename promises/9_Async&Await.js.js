
/** Async */
// The word "async" before a function means one simple thing: 
// A function ALWAYS RETURNS A Promise. Evenn if a function actually returns a non-promise value, prepending the function with "async" automatically wraps the value in a 'RESOLVED PROMISE'
async function f() {
  return 1
}
// f().then(console.log) // 1


/** Await */
// Works only inside async function
// Makes JavaScript wait until that promise settles and returns its result

// A primise that resolves in 1 second
async function f1sec() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 1000)
  })

  let result = await promise  // wait till the promise resolves
  console.log(result) // done

  let r = promise
  console.log(r)
}

f1sec()

/** 
 * await works with `Thenables`
*/
// If await gets a non-promise object with `.then`, it calls that method providing native function`resolve`, `reject` as arguments.


// Call async from non-async
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return 10
}

function fChallenge() {
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}

function fSolution() {
  wait().then(result => console.log(result))
}
