let army = makeArmy()

army[0]() // the shooter number 0 shows 10
army[5]() // and number 5 also outputs 10...
army[2]()
// ... all shooters show 10 instead of their 0, 1, 2, 3...



function makeArmy () {
  let shooters = []
  // let i = 0
  // while (i < 10) {
  //   let p = i  //a fix
  //   let shooter = function () { // shooter function
  //     console.log(p) // should show its number
  //   }
  //   shooters.push(shooter)
  //   i++
  // }

  for (let i = 0; i < 10; i++) {
    let shooter = function () {
      console.log(i)
    }
    shooters.push(shooter)
  }
  
  // works bcz:
  // a new Lexical Environment is created for it,
  // with the corresponding variable i.

  return shooters
}