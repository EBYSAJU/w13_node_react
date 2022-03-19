'use strict'
const express = require('express')
const app = express()
app.use(express.static('public_html'))
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

app.listen(8000, function () {
    console.log('server listening on port 8000')
})
