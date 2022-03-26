'use strict'
// const path = require('path')
const tableInfile = require('./src/tableinfile')
console.log(__dirname)
// const assert = require('assert')
/* const expectedResult =
    [
        {
            id: 100,
            userName: 'mvachon',
            age: 12
        },
        {
            id: 101,
            userName: 'jcote',
            age: 66
        },
        {
            id: 102,
            userName: 'pmartineau',
            age: 99
        }
    ] */

const users = tableInfile.getTable('users.json')
const userById = tableInfile.getRec('users.json', 100)
// const update = tableInfile.updateRec('users.json', { id: 101, userName: 'newjcote', age: 100 })
console.log(userById)
const deleterecord = tableInfile.deleteRec('users.json', 101)
console.log('deleted', deleterecord)
console.log(users)
// console.log(update)
console.log(users)
// assert.deepStrictEqual(expectedResult, users)
// console.log('test succeeded')
