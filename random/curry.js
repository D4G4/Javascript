/*
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

console.log(carriedSum(1)(2)); // 3
*/

/*
Currying? What for?
Advanced currying allows the function to be both callable normally and parially!
*/
function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`)
}

// Let's curry it!
var curry = require('lodash.curry')

log = curry(log)

log(new Date(), 'DEBUG', 'some debug')

log(new Date())('DEBUG')('some debug')

// todayLog will be the partial of log with fixed first argument
let todayLog = log(new Date())
// use it
todayLog('INFO', 'message')


// Convenience function for today's debug messages
let todayDebug = todayLog('debug')
todayDebug('message')



// ------------------ Advanced curry implementation -----------
function curryAdvanced(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

let curriedSum = curry(sum)

console.log(curriedSum(1, 2, 3))  // 6
console.log(curriedSum(1)(2, 3))  // 6
console.log(curriedSum(1)(2)(3))  // 6

// this is how the `curryAdvanced` func looks like
function curryAdvancedExplained(func) {
  return function curried(...varArgs) {
    if (varArgs.length > func.length) {
      // return func.call(this, ...varArgs)
      return func.apply(this, varArgs)
    } else {
      return function pass(...nextVarArgs) {
        return curried.apply(this, varArgs.concat(nextVarArgs))
      }
    }
  }
}






// ------------------ challange (similar to askPassword in functionBinding.js) ---------------------------------------------
{
  const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  function askPassword(funcOk, funcFail) {
    readLine.question('Enter your password: ', (pass) => {
      if (pass === 'daksh') funcOk()
      else funcFail()
      readLine.close()
    })
  }

  let user = {
    name: 'John',
    login(result) {
      console.log(this.name + (result ? ' logged in' : ' failed to log in'))
    }
  }

  // askPassword(?, ?); // ?

  // askPassword(() => user.login(true), () => user.login(false))
  askPassword(user.login.bind(user, true), user.login.bind(user, false))

  function curryLogin(user) {
    return function foo(...varArgs) {
      if (varArgs.length === 1) {
        return () => user.login(varArgs[0])
      } else {
        return foo(false)
      }
    }
  }

  let login = curryLogin(user)
  askPassword(login(true), login())
}