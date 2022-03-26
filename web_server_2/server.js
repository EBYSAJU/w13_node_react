'use strict'
const path = require('path')
// const logger = require('./src/logger')
const express = require('express')
// const { response } = require('express')
const app = express()
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
const cors = require('cors')
app.use(cors())
const tableInfile = require('./src/tableInfile')

app.get('/users', function (request, response) {
    const users = tableInfile.getTable('users.json')

    const usersJSONString = JSON.stringify(users, null, 4)

    response.statusMessage = 'All Ok'// custom HTTP response error message if required

    response.writeHead(200, { 'Content-Type': 'application/json' })

    response.end(usersJSONString)
})
app.get('/users/:id', function (request, response) {
    const id = request.params.id
    const users = tableInfile.getRec('users.json', +id)

    const usersJSONString = JSON.stringify(users)

    response.statusMessage = 'All Ok'// custom HTTP response error message if required

    response.writeHead(200, { 'Content-Type': 'application/json' })

    response.end(usersJSONString)
})
app.post('/users', function (request, response) {
    console.log(request.body)
    /* const { datas } = request.body
    console.log(datas)
    const users = tableInfile.saveTable('users.json', +datas)

    const usersJSONString = JSON.stringify(users)

    response.statusMessage = 'All Ok'// custom HTTP response error message if required

    response.writeHead(200, { 'Content-Type': 'application/json' })

    response.end(usersJSONString) */
    const array = [{ id: 107, userName: 'mvachon', age: 45 }, { id: 111, userName: 'jcote', age: 67 }, { id: 112, userName: 'pmartineau', age: 89 }, { id: 117, userName: 'eby', age: 25 }]
    const users = tableInfile.addRec('users.json', array)
    const usersJSONString = JSON.stringify(users)

    response.statusMessage = 'All Ok'// custom HTTP response error message if required

    response.writeHead(200, { 'Content-Type': 'application/json' })

    response.end(usersJSONString)
})
app.put('/users/:id', function (request, response) {
    // const id = request.params.id
    const array = {
        id: 126,
        userName: 'paul',
        age: 23
    }
    const users = tableInfile.addRec('users.json', array)
    const usersJSONString = JSON.stringify(users)

    response.statusMessage = 'All Ok'// custom HTTP response error message if required

    response.writeHead(200, { 'Content-Type': 'application/json' })

    response.end(usersJSONString)
})
// update
// app.put('/users/:id', function (request, response) {
//     // const id = request.params.id
//     const array = {
//         id: 100,
//         userName: 'eby',
//         age: 25
//     }
//     const users = tableInfile.updateRec('users.json', array)
//     const usersJSONString = JSON.stringify(users)

//     response.statusMessage = 'All Ok'// custom HTTP response error message if required

//     response.writeHead(200, { 'Content-Type': 'application/json' })

//     response.end(usersJSONString)
// })
app.listen(8000, function () {
    console.log('server listening on port 8000')
})
