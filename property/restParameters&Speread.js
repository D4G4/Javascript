function sum (a, b) {
  return a + b
}

function sumAll (...argsArray) {
  let sum = 0
  console.log(`length of array = ${argsArray.length}`)
  for (let arg of argsArray) sum += arg
  console.log(`sum = ${sum} and type is ${typeof sum}`)
  return sum
}

// console.log(sum(1, 2, 3, 4, 4))
// console.log(sumAll(1, 2, 3, 4, 4))



// ------------------ "arguments" variable ---------------------------------------------
function showName () {
  console.log(arguments.length)
  console.log(arguments[0])
  console.log(arguments[1])

  // arguments.map((value) => value * 2)
  console.log(typeof arguments) // object

  // it's iterable
  // for(let arg of arguments) console.log(arg)
}
// showName('Daksh', 'Prachi')



// ------------------(...) Spread Operator---------------------------------------------
// (spread turns array into a list of arguments)

let arrToSumAll = [1, 1, 1]
let arr2 = [1, 1, 1]
console.log('------------------')
console.log(sumAll(arrToSumAll, arr2))
console.log()
console.log(sumAll(...arrToSumAll, ...arr2))
console.log('------------------')

// merging arrays using spread operator
let merged = [0, ...arrToSumAll, 2, ...arr2]
console.log(`merged array -> ${merged}`)
console.log('------------------')

// turning String into array of characters
let str = 'Hello'
console.log([...str])
console.log('------------------')

// converting String into Array
let arrayStr = Array.from(str)
console.log(arrayStr)
console.log('------------------')