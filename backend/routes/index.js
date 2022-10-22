var express = require("express");
var router = express.Router();
var connection = require("../database/connection");

/* GET home page. */
router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM test", (err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
  });
  res.json({ title: "Express" });
});

module.exports = router;
