const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass@123',
  database: 'prvaas_db',
});

module.exports = pool;
