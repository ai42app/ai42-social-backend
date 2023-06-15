const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'mysql90',
  database: 'userdata'
});



module.exports=connection
