class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }

  run(acceleration) {
    this.speed += acceleration
    console.log(`${this.name} runs with speed ${this.speed}`)
  }
  stop() {
    this.speed = 0
    console.log(`${this.name} stopped.`)
  }
}

let animal = new Animal("My Animal")

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`)
  }
}

let rabbit = new Rabbit("White Rabbit")

rabbit.run(5)
rabbit.hide()
rabbit.stop()

// Internally `extends` keyword adds [[Prototype]] reference from `Rabbit.prototype` to `Animal.prototype`



// -------- Any expression is allowed after `extends` -----------------------------------------
function f(phrase) {
  return class {
    sayHi() { console.log(phrase) }
  }
}

class User extends f("Hello!") {}

new User().sayHi()    // Hello!



// -------- Arrow functions have no `super` ---------------------------------------------------
// If accessed it is taken from the outer function



// -------- Overriding constructor -------------------------------------------------------------
/* 
  If a class extends another class and has no `constructor`, then the following "empty" `constructor` is generated
  ______________________________________________________________
 /                                                              \
| class Rabbit2 extends Animal {                                 |
|    // generated fro extending classes without own constructors |
|   constructor(...args) {                                       |
|     super(...args)                                             |
|   }                                                            |
| }                                                              |
 \______________________________________________________________/

  The constructor in inheriting class must call `super()`, and (!) do it before using this.

  In javascript, there's a difference between a "constructor function of an inheriting class" and all others.

  In an inheriting class, the corresponding constructor function is labelled with a special internal property
  [[ConstructorKind]]: "derived"

  The difference is:
  - When a normal consructor runs, it creates an empty object as `this` and continues with it
  - But when a derived constructor runs, it doesn't do it. It expects the parent constructor to do it's job
*/