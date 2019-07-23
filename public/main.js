var tableName;

async function connectToMysql() {
    let myBody = {
        host:document.getElementById("host").value,
        user:document.getElementById("username").value,
        password:document.getElementById("password").value,
        db:document.getElementById("dbName").value,
    }
const response = await api('http://localhost:3000/mysql/createConnection','POST',myBody);

const myJson = await response.json();
    console.log("myJson: ", myJson);
    const tables = await api('http://localhost:3000/mysql/getTables', 'GET');
    let myTable = await tables.json();
    console.log("myTable : ",myTable);
    showTables(myTable);
}

async function showColumn(table){
    let response = await api(`http://localhost:3000/mysql/getColumns/${table}`,'GET')
    let columns = await response.json();
    console.log("columns: ",columns);
    addTable(columns);
    tableName=table;
}

function addTable(dbTable) {            
    var myTableDiv = document.getElementById("myDynamicTable");            
    var table = document.createElement('TABLE');     
    table.border='1';          
    createTableHead(table, dbTable);
    createTableBody(table, dbTable);
    myTableDiv.appendChild(table);
}

function createTableHead(table, dbTable){
    var tableHead = document.createElement('THEAD'); 
    table.appendChild(tableHead);
    var tr = document.createElement('TR');
    tableHead.appendChild(tr);
    Object.keys(dbTable[0]).forEach((key) => {
        var th = document.createElement('TH');
            th.appendChild(document.createTextNode(key));
            tr.appendChild(th);
    })
}

function createTableBody(table,dbTable){
    var tableBody = document.createElement('TBODY');     
    table.appendChild(tableBody);    
    dbTable.forEach((row) => {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        Object.keys(row).forEach((col) => {
            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(row[col]));
            tr.appendChild(td);
        })  
    })
}

function showTables(tables) {     
    var ul = document.getElementById("table-list");     
    tables.forEach((table) => {         
        var li = document.createElement("li");         
        li.setAttribute('id',table);         
        li.appendChild(document.createTextNode(table));         
        ul.appendChild(li);
        var button = document.createElement("button");         
        button.setAttribute('id', table)
        button.appendChild(document.createTextNode('show columns'))
        button.onclick = function() {showColumn(table)};
        ul.appendChild(button);
    }); 
}

async function connectToMongoDb() {
    let myBody = {
        host:document.getElementById("mongo_host").value,
        db:document.getElementById("mongo_dbName").value,
    }

    const response = await api('http://localhost:3000/mongodb/createConnection','POST', myBody)
    console.log(response);
}

async function portData(){
    let schemaBody = JSON.parse(document.getElementById('portData').value);
    const body = { schema: schemaBody , collectionName: tableName};
    console.log('body: ',body); 

   let schema = await api('http://localhost:3000/mongodb/createSchema','POST',body);

   let portResponse = schema ? await api('http://localhost:3000/port', 'POST', {tableName}) : null;
}


function api(url, method, body){
    return new Promise(async (resolve, reject) => {
        var response = await fetch(url,{
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Content-Type': 'application/json'
            }
    })
    resolve(response)
    })
}