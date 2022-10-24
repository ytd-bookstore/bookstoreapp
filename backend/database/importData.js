const fs = require("fs");
const { parse } = require("csv-parse");
const Book = require("../models/Book");

let count = 0;
let maxLines = 3;
let fsStream = fs.createReadStream("./database/dataset/book_data.csv");

fsStream
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    if (count >= maxLines) {
      fsStream.destroy();
    } else {
      Book.create({
        author: row[0],
        description: row[1],
        edition: row[2],
        format: row[3],
        isbn: row[4],
        page: row[5],
        rating: row[6],
        rating_count: row[7],
        title: row[9],
        price: 10,
      });
      count++;
    }
  })
  .on("end", function () {
    console.log("finished!");
  });
