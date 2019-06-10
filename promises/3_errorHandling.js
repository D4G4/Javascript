/* eslint-disable handle-callback-err */
/** Error handling with promises */

const fetchh = require("node-fetch")

// Implicit try...catch
new Promise((resolve, reject) => {
  throw new Error("Whoops!")
}).catch(console.log)

// The above code works exactly the same as
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"))
}).catch(console.log)


// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!")
}).catch(function (error) {
  console.log("The error is handeled, continue normally")
}).then(() => console.log("Next successful handler runs"))


/** Fetch error handling example */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`)
    this.name = "HTTPError"
    this.response = response
  }
}

function loadJson(url) {
  return fetchh(url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new HttpError(response)
      }
    })
}

loadJson("no-such-user.json")
  .catch(console.log) // HttpError: 404 for .../no-such-user.json

