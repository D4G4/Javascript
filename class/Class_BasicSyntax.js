class User {
  constructor(name) { this.name = name }
  sayHi() { console.log(this.name) }
}
// class is a function
console.log(typeof User)  // function

// ...or, more precisely, the constructor method
console.log(User === User.prototype.console)  // true

// The methods are in User.prototype, e.g:
console.log(User.prototype.sayHi)   // console.log(this.name)

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)) // constructor, sayHi



// -------- Not just a syntatic sugar -------------------------------
// rewriting class User in pure functions

// 1. Creating constructor function
function User1(name) {
  this.name = name
}

// any function prototype has a `constructor` property by default, so we don't need to create it 

// 2. Add the metho to prototype
User1.prototype.sayHi = function () { console.log(this.name) }

// Usage:
let user1 = new User1("Daksh")
user1.sayHi()



// -------- Class Expression -------------------------------
// Just like functions, classes can be # defined inside another expression, # passed around, # returned, # assigned etc
let User2 = class {
  sayHi() {
    console.log("Hello")
  }
}

// Similar to Named Function Expression, class expression my or my not have a name
// If a class expression has a name, it's visible inside the calss only
let User3 = class MyClass {
  sayHi() {
    console.log(MyClass)  // MyClass is visible only inside the class
  }
}

new User3().sayHi()

// console.log(MyClass)  // error, MyClass is not visible outside of the class



// --------Make class dynamically "on-demand" -------------------------
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() { console.log(phrase) }
  }
}

// Create a new class
let User4 = makeClass("Hello!")

new User4().sayHi() // Hello!



// -------- Getters/Setters, other shorthands -------------------------------
// Just like literal objects, classes may include getters/setters, generators, compited properties etc

class User5 {
  constructor(name) {
    this.name = name
  }

  get name() {
    return this._name
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short!")
      return
    }
    this._name = name
  }
}

let anotherUser = new User5("Daksh")
console.log(anotherUser.name)

anotherUser = new User("")

// The class declaration creates g&S in `User5.prototype`, like this:
Object.defineProperties(User5.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      this._name = name
    }
  }
})

// Here's the example with computed prioperties
function f() { return "sayHi" }

class User6 {
  [f()]() {
    console.log("Hello")
  }
}

new User6().sayHi() // Hello