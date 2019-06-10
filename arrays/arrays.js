function camelize (str) {
  return str
    .split('-')
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join('')
}

// console.log(camelize('background-color'));







// --------------- FILTER ---------------------------------------------
function filterRange (arr, minVal, maxVal) {
  let tempArr = []
  arr.forEach(element => {
    if (element >= minVal && element < maxVal) tempArr.push(element)
  })
  return tempArr
}

function filterRangeEquivalent (arr, minVal, maxVal) {
  return arr.filter(item => item >= minVal && item <= maxVal)
}

let arr = [5, 3, 8, 1]
let filteredArr = filterRange(arr, 1, 4)
let filteredArr2 = filterRangeEquivalent(arr, 1, 4)
// console.log(filteredArr);
// console.log(filteredArr2);

function filterRangeInPlace (arr, minVal, maxVal) {
  // arr = arr.filter(item => (item >= minVal && item <= maxVal))
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i]
    // remove if outside the range
    if (val < minVal || val > maxVal) {
      arr.splice(i, 1)
      i--
    }
  }
}
filterRangeInPlace(arr, 1, 4)
// console.log(arr);






// --------------- SORTING ---------------------------------------------
let arrToSort = [5, 2, 1, -10, 8]
function reverseSortFunction (a, b) {
  // return a < b;
  return b - a
}

function sortFunction (a, b) {
  // console.log(`a = ${a} & b = ${b} `);
  return a - b
}

arrToSort.sort(sortFunction)
// arrToSort.sort(reverseSortFunction);
// console.log(arrToSort);

// --------------- How to delete an element from the array ---------------
let array = ['I', 'go', 'home']
delete array[1] // remove 'go'

// console.log(array[1]); //undefined

// now arr = ['I', ,'home'];
// console.log(array.length); // 3





// --------------- Array.splice() to the rescue ---------------
// It can do everything: insert, remove and replace elements

/*
syntax:
arr.splice(index[, deleteCount, elem1,...,elemN])
  Starts form the position 'index':
  Removes 'deleteCount' elements  and then inserts
 `elem1,...,elemN` at their place.
*/
array = ['I', 'study', 'JavaScript']
array.splice(1, 1) // from index 1 remove 1 element
// console.log(array)

// Removing 3 elements and replace them with the other two:
array = ['I', 'study', 'JavaScript', 'right', 'now']
array.splice(0, 3, "Let's", 'dance')
// console.log(array)

// Insert new elements without any removals
let arrTest = ['I', 'study', 'JavaScript']

// form index 2
// delete 0 element(s)
// then insert 'complex' and 'language'
arrTest.splice(2, 0, 'complex', 'language')
// console.log(arrTest)

// Negative indecies allowed
arr = [1, 2, 5]

// form index -1 (one step from the end)
// delete - elements,
// then indert 3 and 4
arr.splice(-1, 0, 3, 4)
// console.log(arr)



// --------- Slice ------------------------------------------------------------
// syntax:  arr.slice(start, end)
let str = 'test'
arr = str.split('')

console.log(str.slice(1, 3))
console.log(arr.slice(1, 3))

console.log(str.slice(-2)) // st
console.log(arr.slice(-2)) // s, t
