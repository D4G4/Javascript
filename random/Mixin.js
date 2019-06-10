// mixin
let sayHelloMixin = {
  sayHello() {
    console.log(`Hello ${this.name}`)
  },
  sayBy() {
    console.log(`Bye ${this.name}`)
  }
}

// usage:
class Userr {
  constructor(name) {
    this.name = name
  }
}

// Copy the mehtods
Object.assign(Userr.prototype, sayHelloMixin)

// now User can say hi
new Userr("Dude").sayHello()    // Hello Dude!



// -------- Mixins can make use of inheritence inside themselves -----
let sayMixin = {
  say(phrase) {
    console.log(phrase)
  }
}

let sayHiMixin = {
  __proto__: sayMixin,  // (or we could use Object.create to set the prototype here)
  sayHi() {
    // call the parent method
    super.say(`Hello ${this.name}`)
  },
  sayBy() {
    super.say(`Bye ${this.name}`)
  }
}

class Person {
}

class User extends Person {
  constructor(name) {
    super()
    this.name = name
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin)
console.log(Object.getPrototypeOf(User)) // [Function: Person]

// now User can say `hi`
new User("Dude").sayHi()



// -------- EventMixin -------------------------------
let eventMixin = {
  /** 
   * Subscribe to an event, usage:
      menu.on('select', function(item) {...}) 
  */
  on(eventName, handler) {
    if (!this._eventHandlers) {
      this._eventHandlers = {}
    }

    // Create an empty array inside _eventHandlers for a particular eventName
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(handler)
  },

  /**
   * Removes the function from the handlers list;
   * Cancel the subscription, usage:
      menu.off('select', handler)   
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers && this._eventHandlers[eventName]
    if (!handlers) {
      return
    }
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handler.splice(i--, 1)
      }
    }
  },
  /**
   * Generate the event and attach the data to it
   * All assigned handlers are called and `args` are passed as arguments to them
      this.trigger('select', data1, data2)
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args))
  }
}

// Usage
class Menu {
  choose(value) {
    this.trigger("select", value)
  }
}

// Add the mixin
Object.assign(Menu.prototype, eventMixin)

let menu = new Menu()

// Call the handler on selction
menu.on("select", value => console.log(`Value selected: ${value}`))

// triggers the event => shows Value selected: 123
menu.choose("123")