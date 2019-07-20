const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoDbConn;
var mongoDbModel;

function createConnection(body){
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${body.host}/${body.db}`, 
        { useNewUrlParser: true })
        .then((connection)=>{
            mongoDbConn = connection
            resolve({msg:"MongoDb connected successfully"});

        }).catch((error)=>{
            console.log("mongo connection error: ",error);
            reject(error)
        });
    });
}

function createSchema(body) {
        var schema = new Schema(body.schema);
        mongoDbModel = mongoDbConn.model(`${body.collectionName}`, schema)
}

function dataInsertion(body) {
    return new Promise((resolve, reject) => {
        let model = new mongoDbModel(body);
        model.insertMany((error, response) => {
            if(error) {
                reject(error);
            }
            resolve({msg: "Data inserted sucessfully", response});
        });
    });
}

module.exports = {
    createConnection,
    createSchema,
    dataInsertion
}