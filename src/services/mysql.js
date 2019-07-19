var mysql = require('mysql');
const util = require('../util')
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

function readData(body) {
    return mySqlConn.query('select * from Persons').stream()
}

function getRandomQuery(tableName, index) {
    return `insert into ${tableName} values(${index}, '${util.randomString(5)}', '${util.randomString(7)}', '${util.randomString(3)}', '${util.randomString(4)}');`
}

function insertData(query) {
    return new Promise((resolve, reject) => {
        mySqlConn.query(query, (error, response) => {
            if(error) {
                reject(error)
            }
            resolve(response)
        })
    })
}

module.exports = {
    createConnection,
    closeConnection,
    getTables,
    getColumns,
    readData,
    getRandomQuery,
    insertData
}