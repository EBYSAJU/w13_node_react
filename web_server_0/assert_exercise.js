'use strict'
const assert = require('assert')

function hello (lang) {
    switch (lang) {
    case 'en':
    case 'EN':
        return 'Hello my friend'
    case 'fr':
    case 'FR':
        return 'Bonjour mon ami'
    default:
        return 'Select Language English or French'
    }
}

// testing the function in details

// test #1
assert.strictEqual(hello('fr'), 'Bonjour mon ami', 'Error! Test 1 failed')
assert.strictEqual(hello('FR'), 'Bonjour mon ami', 'Error! Test 2 failed')
assert.strictEqual(hello('en'), 'Hello my friend', 'Error! Test 3 failed')
assert.strictEqual(hello('EN'), 'Hello my friend', 'Error! Test 4 failed')
assert.strictEqual(hello(), 'Select Language English or French', 'Error! Test 4 failed')
// complete this test file to test all cases / path in the function
// YOUR CODE BELOW

console.log('All tests succeeded')
