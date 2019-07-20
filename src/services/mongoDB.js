const mongoose = require('mongoose');
var mongoDbConn;

function createConnection(body){
    return new Promise((resolve, reject) => {
        mongoose.createConnection(`mongodb://${body.host}/${body.db}`)
        .then((connection)=>{
            mongoDbConn = connection
            resolve({msg:"MongoDb connected successfully"})

        }).catch((error)=>{
            console.log("mongo connection error: ",error)
            reject(error)
        });
    })
}

module.exports = {
    createConnection,
}