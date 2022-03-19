'use strict'
const path = require('path')
const logger = require('./src/logger')
const express = require('express')
const { response } = require('express')
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

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

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

app.listen(8000, function () {
    console.log('server listening on port 8000')
})
