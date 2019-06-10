// the syntax "destructurizes" by copying items into variables

let [firstName, lastName] = 'Daksh Gargas'.split(' ')
console.log(firstName)
console.log(lastName)
console.log()

// Ignore elements using commas
let [fName, , title] = [
  'Julius',
  'Ceasar',
  'Consul',
  'of the Roman Republic'
]
console.log(fName)
console.log(title)

// Works with every iterable on the right side
let [a, b, c] = 'abc'
let [one, two, three] = new Set([1, 2, 3])

// Assigning to anything on the left side
let user = {};
[user.name, user.surname] = 'Daksh Gargas'.split(' ')

console.log(user)

// Looping with .entries()
for (let [key, value] of Object.entries(user)) {
  console.log(`key: '${key}' & value: '${value}'`)
}

// getting the rest '...'
let [name1, name2, ...restOfThem] = ['Daksh', 'Saahil', 'Prachi', 'Daman']
console.log(name1)
console.log(name2)
console.log(restOfThem)

// Object Destructuring
let options = {
  title: 'Menu',
  width: 100,
  height: 200
}
// the colon shows "what: goes where"
let { title: tit, height = 100, width: w, zee: z = 0 } = options
console.log(tit, height, w, z)


let coordinates = {
  x: 22,
  y: 44,
  z: 12
}
let { x, ...restOfTheCoordinates } = coordinates
console.log(x)
console.log(restOfTheCoordinates)

let val1, val2, val3;

// {val1, val2, val3} = coordinates   // error
({ x: val1, y: val2, z: val3 } = coordinates)
console.log(val1, val2, val3)