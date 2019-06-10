// Promise handlers `.then`, `.catch`, `.finally` are always asynchronous

// Event when a Promise is immediately resolved, the code on the lines below `.then`, `.catch`, `.finally` will still execute before these handlers.

// Here's a demo
let promise = Promise.resolve()
promise.then(() => console.log("promise done"))
console.log("code finished")  

/** 
 * Microtask queue has a higher priority than the Macrotask queue 
 * Priority `Microtask > Macrotask`
*/

