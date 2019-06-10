let resolvedPromise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000)
})

// -------------- Consumers -------------------------------
// Promise object serves as a link between the executor and the consuming function 

// `.then` 
resolvedPromise.then(
  result => console.log(result),
  error => console.log(error)
)

  
// If we are interested only in successful operations, we can only provide one function argument to `.then`
resolvedPromise.then(console.log)


// ---------------- .catch -------------------------------
// If we are interested only in handing errors, pass null as first argument
let rejectedPromise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Woops!!")), 1000)
})

rejectedPromise.then(
  null, 
  error => console.log(error.message)
)
rejectedPromise.catch(error => console.log(error.message))  // same as above

// -------- finally -------------------------------
new Promise((resolve, reject) => {
  setTimeout(() => resolve("Ho gaya"), 1500)
}).finally(() => console.log("Sequence matters"))
  .then(console.log, err => console.log(err.message))

new Promise((resolve, reject) => {
  reject(new Error("REJECTION"))
}).then(console.log, err => console.log(err.message))
  .finally(() => console.log("Sequence matters\n"))

  
