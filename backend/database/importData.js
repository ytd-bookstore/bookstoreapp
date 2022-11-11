const fs = require("fs");
const { parse } = require("csv-parse");
const Book = require("../models/Book");
const Genre = require("../models/Genre");
const BookGenre = require("../models/BookGenre");

function importGenres() {
  let fsStream = fs.createReadStream("./database/dataset/genres.csv");

  fsStream
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      Genre.create({
        name: row[0],
      });
    })
    .on("end", function () {
      console.log("finished!");
    });
}

async function importBooks() {
  let fsStream = fs.createReadStream("./database/dataset/childrenbooks.csv");

  fsStream
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      let book = await Book.create({
        author: row[0],
        description: row[1],
        edition: row[2],
        format: row[3],
        page: row[5],
        rating: row[6],
        rating_count: row[7],
        title: row[9],
        image_url: row[11],
        price: 10,
      });

      let genres = row[10].split("|");
      const genresMap = new Map();
      for (let i = 0; i < genres.length && !genresMap.get(genres[i]); i++) {
        genresMap.set(genres[i], true);

        var genre = await Genre.findOne({
          where: {
            name: genres[i],
          },
        });

        await BookGenre.create({
          book_id: book["id"],
          genre_id: genre["id"],
        });
      }
    })
    .on("end", function () {
      console.log("finished!");
    });
}

module.exports.importData = () => {
  importGenres();
  importBooks();
};
