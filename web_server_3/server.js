'use strict'
const express = require('express')
const app = express()
app.use(express.static('public_html'))
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.get('/offices/:code', function (request, response) {
    const officecode = request.params.code
    const DB = require('./src/dao')
    DB.queryParams('SELECT * from offices where officecode =$1', [officecode], response, function (error, offices) {
        if (error) {
            console.log(error.message)

            const JSONobj = { msg: 'Database query error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
            response.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else {
            const officesJSON = { msg: 'All Ok', offices: offices.rows }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)

            response.statusMessage = 'All Ok'// custom HTTP response error message if required
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(officesJSONString)
        }
    })
})
app.get('/offices', function (request, response) {
    const DB = require('./src/dao')
    DB.query('SELECT * from offices', response, function (error, offices) {
        if (error) {
            console.log(error.message)

            const JSONobj = { msg: 'Database query error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
            response.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else {
            const officesJSON = { msg: 'All Ok', offices: offices.rows }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)

            response.statusMessage = 'All Ok'// custom HTTP response error message if required
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(officesJSONString)
        }
    })
})
app.put('/update', function (request, response) {
    console.log('body', request.body)
    console.log('body', request.body.officecode)
    const data = [request.body.addressline1, request.body.addressline2, request.body.city, request.body.state, request.body.country, request.body.postalcode, request.body.phone, request.body.territory, parseInt(request.body.officecode)]
    console.log(data)
    const DB = require('./src/dao')
    DB.queryParams('UPDATE offices SET country = $1 , addressline1 = $3,addressline2=$4 ,city =$5 , state =$6 ,postalcode =$7 , phone =$8 , territory =$9 where officecode = $2', [request.body.country, request.body.officecode, request.body.addressline1, request.body.addressline2, request.body.city, request.body.state, request.body.postalcode, request.body.phone, request.body.territory], response, function (error, offices) {
        // addressline1 = ? , addressline2 = ? , city = ? , state = ? ,, postalcode = ? , phone = ? , territory = ?
        if (error) {
            console.log(error.message)

            const JSONobj = { msg: 'Database query error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
            response.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else {
            const officesJSON = { msg: 'All Ok', offices: offices.rows }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)

            response.statusMessage = 'All Ok'// custom HTTP response error message if required
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(officesJSONString)
        }
    })
})
// app.put('/users/:id', function (request, response) {
//     // const id = request.params.id
//     const array = request.body
//     array.id = parseInt(array.id)
//     array.age = parseInt(array.age)

//     // const users = tableInfile.updateRec('users.json', array)
//     // const usersJSONString = JSON.stringify(users)

//     response.statusMessage = 'All Ok'// custom HTTP response error message if required

//     response.writeHead(200, { 'Content-Type': 'application/json' })

//     // response.end(usersJSONString)
// })
app.listen(8000, function () {
    console.log('server listening on port 8000')
})
