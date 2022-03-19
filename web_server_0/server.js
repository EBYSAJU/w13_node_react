'use strict'
console.log('server started')
const myModule = require('./src/myfirstmodule/index.js')
const mySecondModule = require('../web_server_1/src/logger/index.js')
console.log(myModule.hello())
console.log(myModule.byeBye('eby'))
console.log(myModule.length)
console.log(mySecondModule.logMsgSync('some text1\n'))
console.log(mySecondModule.logMsgSync('some text2\n'))
console.log(mySecondModule.logMsgSync('some text3\n'))
const http = require('http')
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('Hello World!')
    res.end()
}).listen(80)
console.log('server listenig on port 80')

// function logMsgSync (message) {
//     if (!fs.existsSync('log')) {
//         try {
//             fs.mkdirSync('log')
//             fs.appendFileSync('./log/server_log.log', 'directory created\n')
//             fs.appendFileSync('./log/server_log.log', message)
//         } catch (error) {
//             console.log(error.code)
//             console.log(error.message)
//         }
//     }
//     fs.appendFileSync('./log/server_log.log', message)
// }

// logMsgSync('some text1\n')
// logMsgSync('some text2\n')
// logMsgSync('some text3\n')

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
