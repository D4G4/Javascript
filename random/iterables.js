let range = {
  from: 1,
  to: 5
}

// 1. Call to for..of initially calls this
range[Symbol.iterator] = function () {
  // ...it returns the iterator object:
  // 2. Onward, for..of words only with this iterator, asking to to next values
  return {
    current: this.from,
    last: this.to,
    // 3. next() is called on each iteration by the for..of loop
    next () {
      // 4. it should return the value as an object {done:.., value:...}
      if (this.current <= this.last) {
        return { dont: false, value: this.current++ }
      } else {
        return { done: true }
      }
    }
  }
}

// for (let num of range) {
//     console.log(num);
// }

/* -------------- Array.form -------------- */
// that takes an iterable or array-like value and makes a "real" Array from it
let arrayLike = {
  0: 'Hello',
  1: 'World!',
  length: 2
}

let arr = Array.from(arrayLike)
console.log(arr.pop())

let rangeArr = Array.from(range)
console.log(rangeArr)

let rangeArrWithMap = Array.from(range, num => num * num)
console.log(rangeArrWithMap)

let str = '𝒳😂'
// splits str into array of characters
let chars = Array.from(str)

for (let char of chars) {
  console.log(char)
}
