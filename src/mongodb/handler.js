const mongoDb = require('../services/mongodb');
const { OK } = require('../requestResponseWrapper');

async function createConnection(body){
    var response = await mongoDb.createConnection(body);
    return OK(response);
}

function createSchema(body) {
    mongoDb.createSchema(body);
    return OK({msg: "schema created"});
}

async function randomDataInsertion(body) {
    var response = await mongoDb.dataInsertion(body)
    return OK(response);
}

module.exports = {
    createConnection,
    createSchema,
    randomDataInsertion
}