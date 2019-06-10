function printPropertyDescriptor(obj, propertyName) {
  let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)
  console.log(JSON.stringify(descriptor, null, 2))
}

// ----------------------------------------------------------------------
let user = {
  name: "John"
}
// printPropertyDescriptor(user, "name")

// ----------------------------------------------------------------------
user = {}
Object.defineProperty(user, "namee", { value: "Daksh" })
// printPropertyDescriptor(user, "namee")  
// compare it with "normally created" `user.name` ALL FLAGS ARE FALSY.

// Object.defineProperty(user, "namee", { value: "Dennis" }) // error: Cannot refefine property



// ------------------ READ-ONLY Properties ---------------------------------------------
user = { name: "Dennis" }
Object.defineProperty(user, "name", { writable: false })
user.name = "Pete"  // !! No ERROR, but the value won't change for user 
// console.log(user)

// Here's the same operation, but for the case when a property doesn't exist
user = {} 
Object.defineProperty(user, "name", {
  value: "Daksh",
  // for new properties need to explicitly list what's true
  enumerable: true,
  configurable: true
})
// console.log(user.name)
user.name = "Dennis"  // won't affect the user object's name property
// console.log(user.name)




// ------------------ NON-ENUMERABLE ---------------------------------------------
// Normally, a built-in `toString()` for objects is non-enumerable, 
// it does not show up in `for...in`
// But if we add `toString()` of our own, then by default it shows up `for...in`, like this:
user = {
  name: "Daksh",
  toString() {
    return this.name
  }
}

// By default, both our properties are listed:
// for (let key in user) console.log(key)
// console.log()

Object.defineProperty(user, "toString", { enumerable: false })
// for (let key in user) console.log(key)



// ------------------ NON-CONFIGURABLE ---------------------------------------------
// Cannot be deleted or altered with `defineProperty`
// For instance, `Math.PI` is read-only, non-enumerable and non-configurable
// printPropertyDescriptor(Math, "PI")
// So programmer is unable to chagne the value of `Math.PI` or override it

user = {} 
Object.defineProperty(user, "name", {
  value: "Daksh",
  writable: false,
  configurable: false 
})
console.log(user.name) // Daksh

// wont' be able to change user.name or its flags, the following won't work
user.name = "Dennis"
console.log(user.name)  // Daksh

delete user.name 
console.log(user.name) // Daksh

// cannot redefine property: name
// Object.defineProperty(user, "name", { value: "ok" })    
// Object.defineProperty(user, "name", { writable: true })



// ------------------ Object.defineProperties ---------------------------------------------
// Defining multiple properties
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false }
  // ...
})



// ------------------ Object.getOwnPropertyDescriptors ---------------------------------------------
let clone

// Normally we can clone an boject, we use assignemnt to copy proeprties like
for (let key in user) {
  clone[key] = user[key]
}

// But that does not copy flags. 
// So if we want "better" clone then Object.defineProperties is preffered.

// To get al lthe property descriptors at once
clone = Object.defineProperty({}, Object.getOwnPropertyDescriptors(user))
