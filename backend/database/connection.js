const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "test1234",
  database: "bookStoreDB",
});

module.exports = connection;
