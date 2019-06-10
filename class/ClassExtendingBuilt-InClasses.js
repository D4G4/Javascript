/* 
https://javascript.info/extend-natives

 // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
*/

let user = {
  [Symbol.toStringTag]: "Daksh"
}

console.log({}.toString.call(user)) // [object User]

console.log(typeof user)


// Also
// `instanceof` does not care about the function, but rather about its `prototype`, that it matches against the prototype chain.