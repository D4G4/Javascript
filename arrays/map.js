let map = new Map()

map.set('1', 'str1')

// chaining
map.set(1, 'num1')
  .set(true, 'bool1')

// remember the regular Object? It would convert keys to String
// Map keeps the type, so these two are different:
console.log(map.get(1))
console.log(map.get('1'))

// --------- map can also use OBJECTS AS KEYS -----------------------------------
let john = { name: 'John' }

// for every user, let's store their visits count
let visitsCountMap = new Map()

visitsCountMap.set(john, 123)

console.log(visitsCountMap.get(john))

// Before `map` this is how it was done
let john2 = { name: 'John', id: 1 }
let visitsCount = {}

visitsCount[john.id] = 123




// ------------------ Map from Object ---------------------------------------------
let map2 = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

let map3 = new Map(Object.entries({ name: 'John', age: 30 }))
// Object.entries return the array of key/value pairs
console.log(`map3.size = ${map3.size}`)




// ------------------ Iterating over map ---------------------------------------------
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion', 50]
])

// iterate over keys
for (let vegetable of recipeMap) {
  console.log(vegetable)
}
