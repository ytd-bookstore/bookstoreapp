const connection = require("../connection");
const fs = require("fs");
const readline = require("readline");

module.exports.execSql = async function (filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let query = "";

  // Read .sql file line by line
  for await (const line of rl) {
    query += line;

    // If line is a end of a query, execute it.
    if (line[line.length - 1] === ";") {
      connection.query(query, (err, rows) => {
        if (err) return console.log("Error: " + err.sqlMessage);
      });

      query = "";
    }
  }
  connection.end();
};

process.exit = 0;

process.on("exit", function (code) {
  return console.log(`\nProcess to exit with code ${code}`);
});
