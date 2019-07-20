const mySql = require('./services/mysql');
const mongoDb = require('./services/mongodb');
const { OK } = require('./requestResponseWrapper');

function portData(body) {
    const readStream = mySql.readData(body)

    readStream.on('data', (chunk) => {
        mongoDb.dataInsertion(chunk);
    })
    return OK({
        ok: 'ok'
    })
    // {
    //     'tableName': 'Persons',
    //     'db': 'test',
    //     'columns': ['']
    // }
    // mongo connection already has - writeStream
    // will read data from mysql with filter of the body, and push to readStream
    // writeStream will push the data to mongo
}

module.exports = {
    portData
}