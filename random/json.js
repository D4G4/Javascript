// ------------------ ENCODING ---------------------------------------------

let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
}

let json = JSON.stringify(student)

// console.log(json)

let room = {
  number: 23
}

let meetup = {
  title: 'Conference',
  participants: [{ name: 'John' }, { name: 'Alice' }],
  place: room // meetup references room
}

room.occupiedBy = meetup // room references meetup

// console.log(JSON.stringify(meetup, [
//   'title',
//   'participants',
//   'place',
//   'name',
//   'number'
// ]))

function replacer (key, value) {
  console.log(`${key}: ${value}`)
  return (key === 'occupiedBy' ? 'bla' : value)
}

// console.log(JSON.stringify(meetup, replacer))

/*
The first call is special
It was made using a special "wrapper object":  {"": meetup}.
In other words, the first (key, value) pair has an empty key,
and the value is the target object as a whole.
That's why the first line is ":[object Object]"
*/



let user = {
  name: 'John',
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
}
// Formatter Spacing
// console.log(JSON.stringify(user, null, 8))



// Custom "toJSON"
room = {
  number: 23,
  toJSON () {
    return this.number
  }
  // without toJSON: {"number":23}
}

meetup = {
  title: 'Conference',
  room
}
/*
Without overriding toJSON()
{"number":23}
{"title":"Conference","room":{"number":23}}
*/
// console.log(JSON.stringify(room))
// console.log(JSON.stringify(meetup))
/*
23
{"title":"Conference","room":23}
*/



// ------------------ DECODING(parsing) ---------------------------------------------

// let value = JSON.parse(str[, reviver]);

let numbers = '[0, 1, 2, 3]'
numbers = JSON.parse(numbers)

// console.log(numbers)

let meetupJsonObj = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

meetup = JSON.parse(meetupJsonObj)

// meetup.date.getDate()   //gives error bcz it's not a date object
console.log(meetup)

// Let's pass JSON.parse the reviving function that returns all values "as is",
// but 'date' will become a 'Date'
meetup = JSON.parse(meetupJsonObj, function (key, value) {
  if (key === 'date') return new Date(value)
  return value
})

console.log(meetup.date.getDate())