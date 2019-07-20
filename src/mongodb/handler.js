const mongoDb = require('../services/mongodb');
const { OK } = require('../requestResponseWrapper');

async function createConnection(body){
    var response = await mongoDb.createConnection(body);
    return OK(response);
}

module.exports = {
    createConnection
}