require('dotenv').config()
let mysql = require('mysql');
let migration = require('mysql-migrations');

let connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.BD_DATABASE,
});

migration.init(connection, './migration');