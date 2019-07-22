/* function connectToMysql(){
    console.log(document.getElementById("host").value);
    console.log(document.getElementById("username").value);
    console.log(document.getElementById("password").value);
    console.log(document.getElementById("dbName").value);
    
}
 */
async function connectToMysql() {
    let myBody = {
        host:document.getElementById("host").value,
        user:document.getElementById("username").value,
        password:document.getElementById("password").value,
        db:document.getElementById("dbName").value,
    }
const response = await fetch('http://localhost:3000/mysql/createConnection', {
    method: 'POST',
    body: JSON.stringify(myBody),
    headers: {
    'Content-Type': 'application/json'
    }
});

const myJson = await response.json();
    console.log("myJson: ", myJson);
    const tables = await fetch('http://localhost:3000/mysql/getTables');
    let myTable = await tables.json();
    console.log("myTable : ",myTable);
    showTables(myTable);
}

async function showColumn(table){
    let response = await (fetch(`http://localhost:3000/mysql/getColumns/${table}`));
    let columns = await response.json();
    console.log("columns: ",columns);
    addTable(columns);
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

    const response = await fetch('http://localhost:3000/mongodb/createConnection', {  
    method: 'POST',
    body: JSON.stringify(myBody),
    headers: {
    'Content-Type': 'application/json'
    }
    });
    console.log(response);
}

