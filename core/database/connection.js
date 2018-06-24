let mysql = require('mysql');
let {Config} = require('./config.js')

module.exports.Conection = mysql.createConnection(Config)

