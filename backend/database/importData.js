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
      if (row[0] != "Childrens") {
        Genre.create({
          name: row[0],
        });
      }
    });
}

function getRandomFraction() {
  fractions = [
    0.0, 0.05, 0.2, 0.25, 0.35, 0.4, 0.49, 0.5, 0.55, 0.6, 0.75, 0.9, 0.95,
    0.99,
  ];
  return fractions[Math.floor(Math.random() * fractions.length)];
}

function getRandomPrice(min, max) {
  price = Math.floor(Math.random() * (max - min + 1)) + min;
  return price + getRandomFraction();
}

function getRandomStock(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function importBooks() {
  let fsStream = fs.createReadStream("./database/dataset/childrenbooks.csv");

  fsStream
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      // If description empty don't import
      if (row[1]) {
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
          price: getRandomPrice(5, 25),
          stock: getRandomStock(0, 50),
        });

        let genres = row[10].split("|");
        const genresMap = new Map();
        for (
          let i = 0;
          i < genres.length &&
          !genresMap.get(genres[i]) &&
          genres[i] != "Childrens";
          i++
        ) {
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
      }
    });
}

module.exports.importData = () => {
  importGenres();
  importBooks();
};
