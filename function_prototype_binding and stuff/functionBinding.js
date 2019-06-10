// Losing 'this'
let user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello, ${this.firstName}`)
  }
}
// setTimeout(user.sayHi, 1000)  // Hello, undefined


// Solution 1: Wrapper
// setTimeout(() => user.sayHi(), 1000)
// works because it receives `user` object from outer lexical environment


// Problem with above solution: 
// what if we change the user object in between the execution
user.sayHi = () => console.log('wtf')

// Solution 2: Binding
// Next solution gurantees that this(above problem) won't happen
// syntax: let boundFunc = func.bind(context);

user = {
  firstName: 'John'
}
function func() {
  console.log(this.firstName)
}

let funcUser = func.bind(user)
// funcUser() // John

function func2(phrase) {
  console.log(phrase + ', ' + this.firstName)
}

let funcUser2 = func2.bind(user)
// funcUser2('Hello')   // Hello, John

// Let's try with object method
user = {
  firstName: 'John',
  sayHi() {
    console.log(`Hello, ${this.firstName}`)
  }
}

let sayHi = user.sayHi.bind(user)
// sayHi()   // Hello, John
// setTimeout(sayHi, 1000)  // Hello, John


/**
 * The exotic bound function object remembers the context (and arguments if provided) 
 * only at creation time
 */
function f() {
  console.log(this.name)
}

// eslint-disable-next-line no-func-assign
f = f.bind({ name: 'John' }).bind({ name: 'Pete' })
// f() // John





// ------------------ Fix a function that looses 'this' ---------------------------
const readline = require('./node_modules/readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
function askPassword(funcOk, funcFail) {
  readline.question(`Enter your password:`, (pass) => {
    if (pass === 'daksh') funcOk()
    else funcFail()
    readline.close()
  })
}

user = {
  name: 'Daksh',  
  loginOk() {
    console.log(`${this.name} logged in`)
  },
  loginFail() {
    console.log(`${this.name} failed to log in`)
  }
}

// askPassword(user.loginOk, user.loginFail) // undefined logged in/failed to log in

// askPassword(() => user.loginOk(), () => user.loginFail()) // works

askPassword(user.loginOk.bind(user), user.loginFail.bind(user))