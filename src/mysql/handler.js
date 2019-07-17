const mySql = require('../services/mysql');

function createConnection(req) {
    var { host, user, password, db } = req.request.body;
    mySql.createConnection(host, user, password, db);
}

function getTables() {
    console.log(mySql.getTables())
}

module.exports = {
    createConnection,
    getTables
}