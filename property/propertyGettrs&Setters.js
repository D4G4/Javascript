/*  
  THERE ARE 2 TYPES OF PROPERTIES 
  1: Data Properties
  2: Accessor Properties (functions that work on getting and setting a value, 
                          but looks like regular properties to an external code)
*/

/* 
    Can a property be both data and access?
    No, it can only be either one or the other.
    ->  Once a property is defined with get prop() or set prop(), 
        it's an ACCESSOR PROPERTY. 
        So there must be a getter to read it, 
        and must be a setter if we want to assign it.
*/



// ------ Accessor properties are represented by `Getter` and `Setter` ----------------------

let user = {
  name: "Daksh",
  surname: "Gargas",
  get fullName() { return `${this.name} ${this.surname}` },
  set fullName(value) { [this.name, this.surname] = value.split(' ') }
}

user.fulllName = "Daksh Gargas"
// console.log(user.name)
// console.log(user.surname)
// console.log(user.fullName)



// ------------------ Accessor Descriptors ---------------------------------------------
user = {
  name: "Daksh",
  surname: "Gargas"
}
Object.defineProperty(user, "fullName", { 
  get() { return `${this.surname} ${this.name}` },
  set(value) { [this.surname, this.name] = value.split(" ") }
})

Object.defineProperty(user, "test", { value: "wow" })
// console.log(user)
// console.log(user.fullName)

// console.log("\nPrinting keys")
// for (let key in user) console.log(key)

// A property can be either an accessor or a data property and NOT BOTH
// If we try to supply both `get` and `value` in the same descriptor, there will be a error
/*
/-------------------------------------\
| Object.defineProperty({}, "prop", { |
|  get() { return 1 },                | 
|  value: 2                           |
| })                                  |
\-------------------------------------/
*/



// ------------------ Smarty Getters/Setters ---------------------------------------------
user = {
  get naam() {
    return this._name
  },
  set naam(value) {
    if (value.length < 4) {
      console.log("Name is too short, need at least 4 characters")
      return 
    }
    this._name = value
  }
}
user.naam = "Daksh"
// console.log(user.naam)
/*
Technically, the external code may still access the name directly by using user._name. 
But there is a widely known agreement that 
properties starting with an underscore "_" are internal 
and should not be touched from outside the object.
*/
// console.log(user._name)


// user.naam = ""


// ------------------ USING FOR COMPATIBILITY ---------------------------------------------
// g&s allow to take control over a "norma;" data property and tweak it at any moment


function User(name, age) {
  this.name = name
  this.age = age 
}

let daksh = new User("Daksh", 21)
// console.log(daksh.age)  // undefined (because functions are placed on top of the file during runtime)

// Things may change. Instead of `age` we may decide to store `birthday` 

function User(name, birthday) {
  this.name = name 
  this.birthday = birthday
}

daksh = new User("Daksh", new Date(1997, 09, 18))
// console.log(daksh) 


/* 
Now what to do with the old code that still uses age property?
We can try to find all such places and fix them, 
but that takes time and can be hard to do if that code is written by other people. 
And besides, age is a nice thing to have in user, right? 
In some places it’s just what we want.
*/
// Adding a getter for `age` mitigates the problem
function User2(name, birthday = new Date(1900, 1, 1)) {
  this.name = name 
  this.birthday = birthday

  // age is  calculated form the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear()
      return todayYear - this.birthday.getFullYear()
    }
  })
}

daksh = new User2("Daksh", new Date(1992, 6, 1))
// let daksh = new User("Daksh")
console.log(daksh.birthday)
console.log(daksh.age)
