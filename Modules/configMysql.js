const mysql = require('mysql')

var connectSQL = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'mysql_node'
});
