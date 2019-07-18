const mySql = require('../services/mysql');

function createConnection(req) {
    var { host, user, password, db } = req.request.body;
    mySql.createConnection(host, user, password, db);
    req.body={msg:"Connection created"};
}

async function getTables(req) {
    let tables = await mySql.getTables()
    req.body=tables;
}

async function getColumns(req) {
    let tableName = req.params.table;
    let columns = await mySql.getColumns(tableName);
    req.body = columns;
}


module.exports = {
    createConnection,
    getTables,
    getColumns
}