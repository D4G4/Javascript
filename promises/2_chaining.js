function perfomChaining() {
  new Promise(function (resolve) {
    setTimeout(() => resolve(1), 1000)
  }).then(function (result) {
    console.log(result)
    return result * 2
  }).then(function (result) {
    console.log(result)
    return result * 2
  }).then(result => console.log(result))
}

// perfomChaining()



/** Thenables */
// .then my return an arbitary "thenable" object if it will be treated the same way as a promise

class Thenable {
  constructor(num) {
    this.num = num
  }

  then(resolve, reject) {
    console.log(resolve)
    setTimeout(() => resolve(this.num * 2), 1000)
  }
}
function callThenable() {
  new Promise(resolve => resolve(1))
    .then(result => new Thenable(result))
    .then(console.log)
}

callThenable()

/**  Bigger example: Fetch */
