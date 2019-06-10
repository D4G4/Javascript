/** __ __ __ __ PROMISIFICATION __ __ __ __ __ __ */

function promisify(f) {
  return function(...args) { // return a wrapper function
    return new Promise((resolve, reject) => {
      function callback(err, result) {  // our custom callback for `f`
        if (err) {
          return reject(err)
        } else {
          resolve(result)
        }
      }

      args.push(callback)

      f.call(this, ...args) // call the original function
    })
  }
}

// usage
function printSum(a, b) {
  return a + b
}

let printSumPromise = promisify(printSum)

printSumPromise(2, 3).then(result => { 
  console.log("I'm inside then")
  console.log(typeof result)
  console.log(result)
})