let list = { value: 1 }
list.next = { value: 2 }
list.next.next = { value: 3 }
list.next.next.next = { value: 4 }

// The list can be easily split
let secondList = list.next.next
list.next.next = null

// To join
list.next.next = secondList

// #insert or remove values any any place

// prepending a new value
list = { value: 'new item', next: list }

// remove a value from the middle
list.next = list.next.next
