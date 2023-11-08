const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'Baseline@77',
  database: 'userdata'
});



module.exports=connection
