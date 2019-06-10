let animal = {
  eats: true,
  walk() { 
    console.log("Animal walk") 
  }
}
let rabbit = {
  jumps: true
}
// rabbit.__proto__ = animal  // depricated
Object.setPrototypeOf(rabbit, animal)

// console.log(`rabbit -> ${rabbit}`)
// console.log(`rabbit.eats -> ${rabbit.eats}`)
// rabbit.walk()

/*
 __proto__ is historical getter/setter for [[Prototype]] 
  
Please note: __proto__ is not the same as [[Prototype]] 
That's a getter/setter for it
*/

let longEar = {
  earLength: 10
}
Object.setPrototypeOf(longEar, rabbit)
// longEar.walk()
// console.log(`longEar.jumps -> ${longEar.jumps}`)



// ------------- Writing doesn't use prototype ≈ Overloading ---------------------------------------------
// That's for data properties only, not for Accessors

let user = {
  name: "Daksh",
  surname: "Gargas",
  set fullName(value) {
    [this.name, this.surname] = value.split(" ")
  },
  get fullName() {
    return `${this.name} ${this.surname}`
  }
}

let admin = {
  __proto__: user,
  isAdmin: true
}

// console.log(admin.fullName) // Daksh Gargas

// setter triggers
admin.fullName = "D4 G4"
// console.log(admin.fullName) // D4 G4

// No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.



// -------- for...in loop -------------------------------
animal = {
  eats: true
}
rabbit = {
  jumps: true,
  __proto__: animal
}

// Object.keys only return own keys
console.log(rabbit) // jumps

// for..in loops over both own and inherited keys (*)
console.log('\nlooping through keys')
for (let prop in rabbit) console.log(prop)  // jumps, then eats

/* 
If that's(*) not what we want, and we'd like to exclude inherited properties,
there's a built-in method 
                      `obj.hasOwnProperty(key)`
It returns `true` of `obj` has its own property named `key`
*/
for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop)
  if (isOwn) {
    console.log(`Our: ${prop}`)
  } else {
    console.log(`Inherited: ${prop}`)
  }
}
// -------- Where is the method `rabbit.hasOwnProperty` coming from? -------------------------------
/* 
  Method is provided by `Object.prototype.hasOwnProperty`
  But it did not appear in `for..in` loop
  -> It's NOT ENUMERABLE 
*/
