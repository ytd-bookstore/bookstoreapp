const { InvalidQueryError, APIError } = require("../utils/errors");
const HttpStatusCode = require("../utils/httpStatusCode");
const expectedQueryValidator = require("../utils/expectedQueryValidator");
const Book = require("../models/Book");
const httpStatusCode = require("../utils/httpStatusCode");

const getBooks = async (req, res, next) => {
  try {
    if (expectedQueryValidator(req.query, ["title", "author", "edition"])) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const { title, author, edition } = req.query;
    let where = {};
    if (title) where.title = title;
    if (author) where.author = author;
    if (edition) where.edition = edition;

    books = await Book.findAll(where);

    res.json(books);
  } catch (err) {
    next(err);
  }
};

const getBooksById = async (req, res, next) => {
  try {
    if (expectedQueryValidator(req.query, [])) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const id = req.params.id;
    const book = await Book.findByPk(id);

    if (!book)
      throw new APIError(
        httpStatusCode.NOT_FOUND,
        "Book not found!",
        req.originalUrl
      );
    res.json(book);
  } catch (err) {
    next(err);
  }
};

module.exports = { getBooks, getBooksById };
