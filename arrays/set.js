let set = new Set()

let john = { name: 'John' }
let pete = { name: 'Pete' }
let mary = { name: 'Mary' }

// visits, some users come multiple times;
set.add(john)
  .add(pete)
  .add(mary)
  .add(john)
  .add(mary)

console.log(set.size)

for (let value of set) console.log(value)

set.forEach((value, valueAgain, set) => {
  console.log(`value ${value.name}`)
  console.log(`value again ${valueAgain.name}`)
})
