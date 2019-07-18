const mySql = require('../services/mysql');
const { OK } = require('../requestResponseWrapper');

function createConnection(body) {
    var { host, user, password, db } = body;
    mySql.createConnection(host, user, password, db);
    return OK({msg:"Connection created"});
}

async function getTables(req) {
    let tables = await mySql.getTables()
    return OK(tables);
}

async function getColumns(req) {
    let tableName = req.params.table;
    let columns = await mySql.getColumns(tableName);
    return OK(columns);
}


module.exports = {
    createConnection,
    getTables,
    getColumns
}