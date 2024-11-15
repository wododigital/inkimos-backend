const mysql=require('mysql');
const { host, database, user, password }=require('./config');

const connection = mysql.createConnection({
    host: host,
    user:user,
    database  : database,
    password: password
});
  
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connected!");
});
  
module.exports=connection;