// Postgres server interface
// our own Database Access Object
// cutomized for the OFFICES API
const { Client } = require('pg')

let PG = {}

const DBconnection = {
    host: 'localhost',
    port: 5432,
    database: 'classicmodels',
    // database: 'final-project-music-albums',
    user: 'postgres',
    password: 'postgres'
}

/* SQL query (without params) ********************************************
   res is an express response object
*/
function query (sqlStr, res, resultCallback) {
    // connect
    PG = new Client(DBconnection)
    PG.connect((error) => {
        if (error) {
            console.log('Database connection error' + error.message)
            // set content type
            const JSONobj = { msg: 'Database connection error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            res.statusMessage = 'Database connection error ' + error.message
            res.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a string
            res.end(JSONString)
        } else {
            console.log('Database connected')
            // excute query
            PG.query(sqlStr, (error, result) => {
                resultCallback(error, result)
            })
        }
    })
}

/* SQL query - with parameters ********************************************/
/* res is an express response object */
function queryParams (sqlStr, params, res, resultCallback) {
    // connect
    PG = new Client(DBconnection)
    PG.connect((error) => {
        if (error) {
            console.log('Database connection error' + error.message)
            // set content type
            const JSONobj = { msg: 'Database connection error ' + error.message }
            const JSONString = JSON.stringify(JSONobj, null, 4)
            res.statusMessage = 'Database connection error ' + error.message
            res.writeHead(500, { 'Content-Type': 'application/json' })
            // send out a string
            res.end(JSONString)
        } else {
            console.log('Database connected')
            // execute query
            PG.query(sqlStr, params, (error, result) => {
                resultCallback(error, result)
            })
        }
    })
}

// disconnect from database ----------------------------------
function disconnect () {
    PG.end()
}

// public interface of the module -----------------------------
module.exports = {
    query: query,
    queryParams: queryParams,
    disconnect: disconnect
}
