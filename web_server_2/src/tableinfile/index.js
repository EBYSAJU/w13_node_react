
const fs = require('fs')
function getTable (filename) {
    const tableString = fs.readFileSync(filename, 'utf8')
    console.log(tableString)
    const tableJson = JSON.parse(tableString)
    return tableJson
}

function getRec (filename, id) {
    const tableString = fs.readFileSync(filename, 'utf8')
    const tableJson = JSON.parse(tableString)
    for (let i = 0; i < tableJson.length; i++) {
        if (tableJson[i].id === id) {
            return tableJson[i]
        }
    }
}
function saveTable (filename, datas) {
    fs.writeFileSync(filename, JSON.stringify(datas))
    const tableString = fs.readFileSync(filename, 'utf8')
    return tableString
}
function addRec (filename, datas) {
    const tableString = fs.readFileSync(filename, 'utf8')

    const tableJson = JSON.parse(tableString)
    tableJson.push(datas)
    saveTable(filename, tableJson)
    return tableJson
}
function updateRec (filename, datas) {
    const tableString = fs.readFileSync(filename, 'utf8')
    const tableJson = JSON.parse(tableString)
    for (let i = 0; i < tableJson.length; i++) {
        if (tableJson[i].id === datas.id) {
            tableJson[i].id = datas.id
            tableJson[i] = datas
            saveTable(filename, tableJson)

            return tableJson[i]
        }
    }
}
function deleteRec (filename, id) {
    const tableString = fs.readFileSync(filename, 'utf8')
    const tableJson = JSON.parse(tableString)
    for (let i = 0; i < tableJson.length; i++) {
        if (tableJson[i].id === id) {
            tableJson.splice(i, 1)
        }
    }
    saveTable(filename, tableJson)
    return tableJson
}
exports.getTable = getTable
exports.getRec = getRec
exports.saveTable = saveTable
exports.addRec = addRec
exports.updateRec = updateRec
exports.deleteRec = deleteRec
