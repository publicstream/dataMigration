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

function randomDataInsertion() {
    for(var i = 0; i <= 100000; i++) {
        const query = mySql.getRandomQuery('Persons', i)
        // console.log(query)
        mySql.insertData(query)
        .then((response) => {
            console.log('res: ', response)
        })
        .catch((error) => {
            console.log('error: ', error)
        })
    }
}


module.exports = {
    createConnection,
    getTables,
    getColumns,
    randomDataInsertion
}