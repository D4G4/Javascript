/*
let name = 'John'
function sayHi () {
  console.log(`Hi, ${name}`)
}
name = 'Pete'
sayHi() // 'Hi, Pete'
*/
// -------------------------

function makeWorker () {
  let name = 'Pete'
  return function () {
    console.log(name)
  }
}
var name = 'John'

// create a function
let work = makeWorker()

work() // Pete  (didn't use the latest value)

/* WHY?
  When the code wants to access a variable
  -the inner Lexical Environment is searched first
  -> then the outer one -> then more outer one..... -> Global one
  */



// ------------------ IIFE ---------------------------------------------
// Immediately-Invoked Function Expressions




// ------------------ Double parentheses ---------------------------------------------
// Sum with closures
// For second parentheses to work, the first one MUST RETURN a function
function sum (a) {
  return function (b, message) {
    return `${message}: ${a + b}` // takes 'a' from the outer lexical env
  }
}

console.log(sum(1)(3, 'the sum'))

// sum(1) will return a function which will take another argument(s)


// Filter through function
console.log('-----Filter through function------')
let arr = [1, 2, 3, 4, 5, 6, 7]
function inBetween (min, max) {
  return function (value) {
    return value >= min && value <= max
  }
}

console.log(arr.filter(value => inBetween(3, 6)(value)))
console.log(arr.filter(inBetween(3, 6)))

function inArray (array) {
  return function (value) {
    return array.includes(value)
  }
}
console.log(arr.filter(inArray([1, 2, 10])))


console.log('--------Sort by field----------')
let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' }
]
console.log('usual way (by name)')
console.log(users.sort((userA, userB) => userA.name > userB.name ? 1 : -1))

function byField (field) {
  return (a, b) => a[field] > b[field] ? 1 : -1
}

function byFieldEquivalent (field) {
  return function (a, b) {
    return a[field] > b[field] ? 1 : -1
  }
}

console.log('--------by name--------')
console.log(users.sort(byField('name')))

console.log('--------by age--------')
console.log(users.sort(byField('age')))