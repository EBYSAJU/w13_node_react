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
}

logMsgSync('some text1\n')
logMsgSync('some text2\n')
logMsgSync('some text3\n')

// function logMsg (message) {
//     try {
//         if (!fs.asynchronous('log')) {
//             fs.mkdirSync('log')
//             fs.appendFileSync(' ./log/server_log.log', 'directory created\n')
//         }
//     } catch (error) {
//         console.log(error.code)
//         console.log(error.message)
//     }
//     fs.appendFileasync(' server_log.log', message)
// }
// fs.access('log'(error)=>){
//     if (err)
//     console.error('No Read access');
//   else
//     console.log('File can be read');
// });
