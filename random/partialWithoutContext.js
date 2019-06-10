/* 
What is we want to fix some arguments, but not `this` ?
The native `bind` does not allow that. We can't just ommit the context.

Fortunately `parial` functions for binding only args can be easily implemented
*/

function partial(func, ...argsBound) {
  return function(...args) {
    return func.call(this, ...argsBound, ...args)
  }
}

let user = {
  firstName: 'John',
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}`)
  }
}

// Usage:
user.sayNow = partial(
  user.say, 
  new Date().getHours() + ':' + new Date().getMinutes()
)

user.sayNow('Hello')
