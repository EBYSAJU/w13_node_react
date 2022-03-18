'use strict'
const fs = require('fs')
try {
    const fileContent = fs.readFileSync('some_file.txt', 'utf8')
    console.log(fileContent)
} catch (error) {
    console.log(error.code)
    console.log(error.message)
    fs.writeFile('writeerror.txt', error.code)
}
console.log('i am still running')
