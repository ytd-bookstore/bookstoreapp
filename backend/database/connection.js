// Deprecated! Do not use in app!
const mysql = require("mysql");
const dbConfig = require("./dbConfigLocal.json");

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
