import mysql from 'mysql2/promise';
// create the connection to database
console.log("Creating connection pool...")
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
    // password: 'password'
})

// simple query
// connection.query(
//   'SELECT * FROM `users`',
//   function(err, results, fields) {
//     console.log(">>check mysql")
//     console.log(results); // results contains rows returned by server
//     let row = results.map((row) =>{return row.id});
//     console.log(results[0])
//   }
// );

export default pool;