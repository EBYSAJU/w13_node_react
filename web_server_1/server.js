'use strict'
const path = require('path')
// const logger = require('./src/logger')
const express = require('express')
// const { response } = require('express')
const app = express()
app.use(express.static('public_html'))

app.set('view engine', 'ejs')
app.get('/chair',
    function (req, res) {
        res.sendFile(path.join(__dirname, 'public_html', 'page1.html'))
    }
)
app.get('/login',
    function (req, res) {
        res.sendFile(path.join(__dirname, 'public_html', 'form_post.html'))
    }
)
app.get('/download',
    function (req, res) {
        res.sendFile(path.join(__dirname, 'public_html', 'contract.pdf'))
    }
)
app.get('/',
    function (req, res) {
        res.send('<h1>Hello World</h1>')
    }
)
app.get('/byebye',
    function (req, res) {
        res.send('<h1>Bye bye World</h1>')
    }
)
app.get('/customer_search_form',
    function (req, res) {
        res.sendFile(path.join(__dirname, 'public_html', 'form_customer.html'))
    }
)

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// use cors
const cors = require('cors')
app.use(cors())
// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form with get')
        }
    }
)
app.get('/customers/:a',
    function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<h1>Info for customer number' + req.params.a + '<h1>')
    }
)

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})
app.get('/seasons', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'seasons'
    pageData.description = 'list of seasons'
    pageData.author = 'eby saju'
    const products = [
        { id: 1, name: 'winter' },
        { id: 2, name: 'spring' },
        { id: 3, name: 'summer' },
        { id: 4, name: 'fall' }

    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('season.ejs', pageData)
})
// ------------------

app.get('/customers_list', function (request, response) {
    const DB = require('./src/logger/dao/')
    DB.query('SELECT * from customers', response,
        function (error, customers) {
            if (error) {
                // set content type
                response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
                response.writeHead(500, { 'Content-Type': 'text/html' })
                // send out a string
                response.end(response.statusMessage)
            } else {
                let html = ''
                html += 'Number of customers: ' + customers.rowCount + '<br>'
                html += '<table>'
                for (let i = 0; i < customers.rowCount; i++) {
                    html += '<tr><td>' + customers.rows[i].customernumber + '</td><td>' + customers.rows[i].customername + '</td></tr>'
                }
                html += '</table>'

                const pageData = {}
                pageData.content = html
                response.render('master_template', pageData)
            }
        })
})

// ------------------------------------

app.post('/customer_search_id', function (request, response) {
    const id = request.body.id
    console.log(id)
    const DB = require('./src/logger/dao/')
    DB.queryParams('SELECT * from customers where customernumber =$1', [id], response,
        // DB.query('SELECT * from customers where customernumber =' + id + '', response,
        function (error, customers) {
            if (error) {
                // set content type
                response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
                response.writeHead(500, { 'Content-Type': 'text/html' })
                // send out a string
                response.end(response.statusMessage)
            } else {
                let html = ''
                html += 'Number of customers: ' + customers.rowCount + '<br>'
                html += '<table>'
                for (let i = 0; i < customers.rowCount; i++) {
                    html += '<tr><td>' + customers.rows[i].customernumber + '</td><td>' + customers.rows[i].customername + '</td><td>' + customers.rows[i].contactlastname + '</td><td>' + customers.rows[i].contactfirstname + '</td><td>' + customers.rows[i].phone + '</td><td>' + customers.rows[i].addressline1 + '</td><td>' + customers.rows[i].addressline2 + '</td><td>' + customers.rows[i].city + '</td><td>' + customers.rows[i].state + '</td></tr>'
                }
                html += '</table>'

                // use the page template of course to display the list
                const pageData = {} // initialize empty object
                pageData.title = 'Customers List-blabla.com'
                pageData.description = 'Customers Number and Name'
                pageData.author = 'The blabla.com team'
                // send out the html table
                pageData.content = html
                response.render('master_template', pageData)
            }
        })
})
// load object from file
// const myStudent = require(path.join(__dirname, 'students.json'))
// console.log(myStudent)
// const fs = require('fs')
// const myStudentString = JSON.stringify(myStudent)
// console.log(myStudentString)
// fs.writeFileSync(path.join(__dirname, 'stduents.json'), myStudentString)
// for AJAX tests, returns the list of customers in a JSON string
// test with http://localhost:8000/customers
app.get('/customers', function (request, response) {
    const DB = require('./src/logger/dao')
    DB.query('SELECT * from customers', response, function (error, customers) {
        if (error) {
            console.log(error.message)

            const JSONobj = { msg: 'Database query error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
            response.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else {
            const customersJSON = { msg: 'All Ok', customers: customers.rows }
            const customersJSONString = JSON.stringify(customersJSON, null, 4)

            response.statusMessage = 'All Ok'// custom HTTP response error message if required
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(customersJSONString)
        }
    })
})
// delete 1 customer
app.delete('/customers/:id', function (request, response) {
    const id = request.params.id

    const DB = require('./src/logger/dao')
    DB.queryParams('DELETE from customers where customernumber=$1', [id], response, function (error, customers) {
        if (error) {
            console.log(error.message)

            const JSONobj = { msg: 'Database query error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
            response.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else if (customers.rowCount >= 1) {
            const JSONobj = { msg: 'ok customer deleted ' }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else {
            const JSONobj = { msg: 'customer not found,not deleted ' }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        }
    })
})
app.get('/employees', function (request, response) {
    const DB = require('./src/logger/dao')
    DB.query('SELECT * from employees', response, function (error, employees) {
        if (error) {
            console.log(error.message)

            const JSONobj = { msg: 'Database query error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            response.statusMessage = 'Database query error ' + error.code + ' ' + error.message
            response.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(JSONString)
        } else {
            const employeesJSON = { msg: 'All Ok', employees: employees.rows }
            const employeesJSONString = JSON.stringify(employeesJSON, null, 4)

            response.statusMessage = 'All Ok'// custom HTTP response error message if required
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a JSON string
            response.end(employeesJSONString)
        }
    })
})

app.listen(8000, function () {
    console.log('server listening on port 8000')
})
