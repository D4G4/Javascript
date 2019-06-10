let json = `{ "name": "John", "age": 30 }`

/*
The "pseudocode" for the build-in Error class defined by JavaScript itself
 
class Error {
  constructor(message) {
    this.message = message 
    this.name = "Error"
    // this.stack = <nested calls> // non-standard, but most environments support it 
  }
} 
*/

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = "Validation Error"  
  }
}

function test() {
  throw new ValidationError("Whoops!")
}

try {
  test()
} catch (err) {
  console.log(err.message)
  console.log(err.name)
  console.log(err.stack)
}

// Usage
function readUser(json) {
  let user = JSON.parse(json)

  if (!user.age) {
    throw new ValidationError("No field: age")
  }

  if (!user.name) {
    throw new ValidationError("No field: name")
  }

  return user
}

// Wokring example with try..catch
try {
  let user = readUser('{ "age": 25 }')
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Invalid data: " + err.message)
  } else if (err instanceof SyntaxError) {
    console.log("JSON Syntax Error: " + err.message)
  } else {
    throw err
  }
}