// Deprecated! Do not use in app!
const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "user",
  password: "test1234",
  database: "bookStoreDB",
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;
