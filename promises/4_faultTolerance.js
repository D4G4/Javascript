/** Fault-tolerant Promise.all */
let fetch = require("node-fetch")

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "http://no-such-url",
]

// solution 1
function solution1() {
  Promise.all(urls.map(fetchUrl))
    .then(responses => {
      console.log(responses[0].status)
      console.log(responses[1].status)
      console.log(responses[2].status)
    })
}

// solution 2
function solution2() {
  Promise.all(urls.map(url => fetch(url).catch(err => err)))
    .then(responses => {
      console.log(responses[0].status)
      console.log(responses[1].status)
      console.log(responses[2].status)
    })
}

function fetchUrl(url) {
  console.log(`fetching url ${url}`)
  let returnValue = fetch(url)
    .then(
      resolvedValue => resolvedValue,
      rejectedValue => rejectedValue
    )
  return returnValue
}

// solution1()
// solution2()





/** Fault-tolerante fetch with JSON */

// The problem
let urlss = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
  "http://no-such-url",
]

// make fetch requests
/* 
Promise.all(urlss.map(url => fetch(url)))
  // map each response to response.json()
  .then(responses => Promise.all(
    responses.map(r => r.json())
  ))
  // show name of each user
  .then(users => {  // (*)
    for (let user of users) {
      console.log(user.name)
    }
  }) 
*/

Promise.all(urlss.map(url => fetch(url).catch(err => err)))
  .then(responses => Promise.all(
    responses.map(r => r instanceof fetch.Response ? r.json() : r)
  ))
  .then(users => {
    for (let user of users) {
      console.log(`user = ${user}`)
      console.log(user.name)
      console.log()
    }
  })

// NOTE: r.json() returns a Promise<any>