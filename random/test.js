function sum(a, b, c) { return a + b + c }

function callSum() {
  console.log('callSum')
  console.log(typeof arguments)
  console.log(arguments)
  console.log(`call -> ${sum.call(this, arguments)}`) // it concatinated it as string
  console.log(`call (comma sep)-> ${sum.call(this,
    arguments[0],
    arguments[1],
    arguments[2])}`)
  console.log(`call (apread opearor)-> ${sum.call(this, ...arguments)}`)
  console.log(`apply -> ${sum.apply(this, arguments)}`)
}

function callSum2(...varArgs) {
  console.log('callSum2')
  console.log(typeof varArgs)
  console.log(varArgs)
  console.log(`call -> ${sum.call(this, varArgs)}`)
  console.log(`call (spred operator)-> ${sum.call(this, ...varArgs)}`)
  console.log(`apply -> ${sum.apply(this, varArgs)}`)
  // console.log(`apply (spread operator)-> ${sum.apply(this, ...varArgs)}`) // error
}

callSum(1, 2, 3)
console.log()
callSum2(1, 2, 3)

/*
CONCLUSION:
.call() requires comma separated arguments or use spread operator
.apply() requires an array
*/