const mysql = require('mysql2/promise');

const mysqlConnection = async ({ querys, values = [] }) => {
   let connection = await mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    port:"3306",
    user: "sql6584162",
    password: "TMuhLc6Dfj",
    database: "sql6584162",
   });
   
 try {
   var data;
   await connection.connect()
   .then(() => connection.query(querys))
   .then(([rows, fields]) => {
       data = rows;
   });
   await connection.end();
   return data;
 } catch (error) {
   return { error };
 }
}
module.exports= mysqlConnection;