// NOTES:

// The `F.prototype` property is not the same as [[Prototype]] (__proto__).   The only thing `F.prototype` does: it sets [[Prototype]] of new objects when    `new F()` is called

// The value of `F.prototype` should be either an object or null: other values won't work

// The "prototype" property only has such a special effect when set on a constructor function and invoked with 'new'

// By default, all functions have `F.prototype = { constructor: F }`, so we can get the constructor of an objecvt by accessing its "constructor" property
// -----------------------------------------------------------------------------


// Remember, new objects can be created with a constructor function `new F()`? `F.prototype` means a regular property named "prototype"
let animal = {
  eats: true
}
function Rabbit(name) {
  this.name = name 
}
Rabbit.prototype = animal // (*)

let rabbit = new Rabbit("White Rabbit") // rabbit.__proto__ == animal
console.log(rabbit.eats)  // true

// (*)
// Setting `Rabbit.prototype = animal` literally states the following:          " When a `new Rabbit` is created, assign its [[Prototype]] to `animal` " 


// -------- The "ONE-TIME GIFT" -------------------------------
// `F.prototype` is only used at `new F()` time, it assigns [[Prototype]] of the new object. After that, there's no connection between F.prototype and the new object.

// Also, every function has a `prototype` property, even if we don't supply it. The default "prototype" is an object with the only property constructor that points back to the function itself. Therefore: 
function Apple() {}
/* default prototype
Apple.prototype = { constructor: Apple }
*/

// We can check it
console.log(
  `Apple.prototype.constructor === Apple -> ${Apple.prototype.constructor === Apple}`)

// Like we can use `constructor` property to create a new object
function Fruit(name) {
  this.name = name 
  console.log(name)
}

let banana = new Fruit("Banana")

let greenBanana = new banana.constructor("Green Banana")

// That's handy when we have an object and we don't know which constructor was used for it.
// But, JS does not ensure right constructor value

// Yes, it exists in default "prototype" for functions, but THAT's ALL!!! What happens with it later, is totally upon us

// In particular, if we replace the default prototype as a whole, then there will be no "constructor" in it. For instance:
function Orange() {}
Orange.prototype = {
  seeds: true
}
let orange = new Orange()
console.log(
  `orange.constructor === Orange ${orange.constructor === Orange}`) // false

// So to keep the right "constructor" we can choose to add/remove properties to the default "prototype" instead of overwriting it as a whole
function Orange2() {}

// Not overwrite `Orange2.prototype` totally; Just add to it
Orange2.prototype.jumps = true 

// Or alternatively, recreate the constructor property manually
Orange2.prototype = {
  barks: false,
  console: Orange2
}
// now constructor is also correct, because we added it

let orange2 = Orange2.constructor
console.log(orange2.barks)  // undefined (because Boy.construcor has old Boy())

let anotherOrange2 = new Orange2()
console.log(anotherOrange2.barks) // false





console.log('-------- Challenge -------------------------------')


console.log("----------#1---------")
function CRabbit() {}
CRabbit.properties = { eats: true }

let cRabbit = new CRabbit()

CRabbit.prototype = {}

console.log(cRabbit.eats)  



console.log("----------#2---------")
function CRabbit2() {}
CRabbit2.prototype = { eats: true }

let cRabbit2 = new CRabbit2() 

CRabbit2.prototype.eats = false 

console.log(cRabbit2.eats) 



console.log("----------#3---------")
function CRabbit3() {}
CRabbit3.prototype = { eats: true }
let cRabbit3 = new CRabbit3() 

delete cRabbit3.eats

console.log(cRabbit3.eats) 


console.log("----------#4---------")
function CRabbit4() {}
CRabbit4.prototype = { eats: true }

let cRabbit4 = new CRabbit4()

delete CRabbit4.prototype.eats

console.log(cRabbit4.eats)

