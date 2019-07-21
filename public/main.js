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
    console.log(myJson);
}

