'use strict'
const USER_ARRAY = [
    { id: 1, name: 'Martin', age: 45 },
    { id: 2, name: 'Pierre', age: 15 },
    { id: 3, name: 'Josee', age: 14 },
    { id: 4, name: 'Melanie', age: 32 },
    { id: 5, name: 'Sonia', age: 24 }
]
function removeAge (users) {
    return { id: users.id, name: users.name }
}
const result = USER_ARRAY.map(removeAge)
console.log(result)
function Age (userage) {
    return userage.age > 15
}

const resultAge = USER_ARRAY.filter(Age)

console.log(resultAge)
function sum (total, user) {
    return total + user.age
}
const resultAverage = USER_ARRAY.reduce(sum, 0)
console.log(resultAverage / USER_ARRAY.length)

function userToTr (oneUser) {
    return '<tr><td>' + oneUser.id + '</td><td>' + oneUser.name + '</td><td>' + oneUser.age + '</td></tr>'
}
const htmlArray = USER_ARRAY.map(userToTr)
console.log(htmlArray)
const htmlTabel = '<table>' + htmlArray.reduce(stringArrayToString, '') + '</table>'
function stringArrayToString (total, oneString) {
    return total + oneString
}
console.log(htmlTabel)

/// ////////////////////////////////
