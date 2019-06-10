// Keys MUST be objects, not primitive values.
let weakMap = new WeakMap()

let obj = {}

weakMap.set(obj, 'ok')

// can't use a string as the key
// weakMap.set('test', 'whoops') //error

/*
 now if we use an object as the key in it,
 and there is no other references to that object
 it will be removed form the memory(and form the map) automatically
*/
let john = { name: 'John' }
let jonny = { name: 'Jonny' }

weakMap = new WeakMap()
weakMap.set(john, 'secret documents')
// if john dies, secret documents will be destroyed

weakMap.set(jonny, 'jonnyyyy')

let map = new Map()
map.set(john, '...')
map.set(jonny, 'jonnyy')

john = null

for (let val of map) {
  console.log(val)
}

