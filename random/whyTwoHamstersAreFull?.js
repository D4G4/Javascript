let hamster = {
  stomach: [],
  eat(food) {
    // this.stomach.push(food)
    // FIX!! 
    // assign to this.stomach instead of this.stomach.push
    this.stomach = [food]
  }
}

let speedy = {
  __proto__: hamster
}

let lazy = {
  __proto__: hamster
}

// This one found the food
speedy.eat("apple")
console.log(speedy.stomach) // apple

// This one also has it, why? fix please.
console.log(lazy.stomach) // apple

// Because it is using stomach of its ancestor
