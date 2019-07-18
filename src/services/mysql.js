var mysql = require('mysql');
var mySqlConn;

function createConnection(host, user, password, db){
    var mySqlConnection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: db
    });
    
    mySqlConnection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + mySqlConnection.threadId);
    }); 
    mySqlConn = mySqlConnection;   
}

function closeConnection() {
    mySqlConn.end((error, response) => {
        console.log('connection close: ')
    })
}

function getTables() {
    return new Promise((resolve, reject) => {
        mySqlConn.query('show tables', (error, response) => {
            if(error) {
                reject(error);
            }
            resolve(response);
        });
    })
}

function getColumns(tableName){
    return new Promise((resolve, reject) => {
        mySqlConn.query(`show columns from ${tableName}`, (error, response) => {
            if(error){
                reject(error);
            }
            resolve(response);
        });
    })
}

module.exports = {
    createConnection,
    closeConnection,
    getTables,
    getColumns
}