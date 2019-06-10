/** __ __ __ __ __ __ Promise.resolve __ __ __ __ */
/*  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __
  /                                                       \
 |  let promise = Promise.resolve(value)                   |
  \ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ /

        is same as
    __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __
  /                                                       \
 |  let promise = new Promise(resolve => resolve(value))   |
  \ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ /
*/

function loadedCache(url) {
  let cache = loadedCache.cache || (loadedCache.call = new Map())

  if (cache.has(url)) {
    return Promise.resolve(cache.get(url))
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url, text)
      return text
    })
}
/** __ __ __ __ __ __ Promise.reject __ __ __ __ __ __ */
// Same as Promise.resolve

/** __ __ __ __ __ __ Promise.all __ __ __ __ __ __ __ */
/* 
Let's say we want to run many promises to execute in parallel, and wait till all of them are ready.
    __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __
  /                                                       \
 |   let promise = Promise.all([...arrayOfPromises...])    |
  \ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ /
*/

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(111), 3000)),
  new Promise(resolve => setTimeout(() => resolve(222), 2000)),
  new Promise(resolve => setTimeout(() => resolve(333), 1000)),
]).then(console.log)  // [1, 2, 3]  afer (3 + 2 + 1)s
// Note: Relative order is the same. Even though the first promise takes the longest time to resolve, it is still first in array of results.
/**  
 * If any of the promises is rejected, `Promise.all` immediately rejects with that error 
*/

// Promise.all() allows non-promise items in `iterable`. If any of the item in the array isn't Promise, it's wrapped in `Promise.resolve`

/** __ __ __ __ __ __ Promise.race __ __ __ __ __ __ */
// Same as `Promise.all`, it takes an iterable of promises but instead of waiting for all of them to finish, it waits for the first result(or error), and goes on with it.
// The result of following code will be 1

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve("\nBALABALA\n"), 1000)),
  // new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!"), 2000))),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(result => console.log(`\n${result}\n\n`))
