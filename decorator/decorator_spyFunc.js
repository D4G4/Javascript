/*
function work(a, b) {
  alert( a + b ); // work is an arbitrary function or method
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
*/

function work(a, b) {
  return a + b
}

function spy(func) {
  console.log('spy called')
  function wrapper() {
    console.log('wrapper called')
    let arr = []
    for (let item of arguments) {
      arr.push(item)
    }
    wrapper.calls.push(arr)
    let result =  func.apply(this, arguments)
    return result
  }
  wrapper.calls = []
  return wrapper
}

let workFunc = spy(work)

console.log(workFunc(1, 2))
console.log(workFunc(4, 5))

workFunc.calls.forEach(args => console.log('call:' + args.join()))