'use strict'
console.log('server started')
const fs = require('fs')
function logMsgSync (message) {
    if (!fs.existsSync('log')) {
        try {
            fs.mkdirSync('log')
            fs.appendFileSync('./log/server_log.log', 'directory created\n')
            fs.appendFileSync('./log/server_log.log', message)
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }
    fs.appendFileSync('./log/server_log.log', message)
    // return 'hi'
}

exports.logMsgSync = logMsgSync
