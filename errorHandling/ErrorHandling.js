try {
  console.log("Start of try runs")

  lalala

  console.log("End of try (never reached)")
} catch (err) {
  console.log(`Error has occured and the error is`)
  console.log(err.name)
  console.log()
  console.log("MESSAGE is")
  console.log(err.message)
  console.log()
  console.log("STACK is\n[")
  console.log(err.stack)
  console.log("]\nend of stack\n")
}
console.log("... then the execution continues")




// -------- Optional "catch" binding -------------------------------

/*
try {
  // ...
} catch {
  // error object omitted
} 
*/


// -------- "Throw" operator -------------------------------
let bundChadika = new Error("Bund vund")

try {
  console.log("Bund chadika hon lagia ha veer")
  throw bundChadika
} catch (err) {
  console.log(err)
  console.log("message ->")
  console.log(err.message)
}