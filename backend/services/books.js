const { InvalidQueryError, APIError } = require("../utils/errors");
const Book = require("../models/Book");
const Genre = require("../models/Genre");
const httpStatusCode = require("../utils/httpStatusCode");

const getBooks = async (req, res, next) => {
  try {
    const { title, author, edition, ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    let where = {};
    if (title) where.title = title;
    if (author) where.author = author;
    if (edition) where.edition = edition;

    const books = await Book.findAll({ where });

    res.json(books);
  } catch (err) {
    next(err);
  }
};

const getBooksById = async (req, res, next) => {
  try {
    const { ...others } = req.query;

    if (Object.keys(others).length != 0) {
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

const getBooksByIdWithGenres = async (req, res, next) => {
  try {
    const { ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const id = req.params.id;
    const book = await Book.findByPk(id, {
      include: {
        model: Genre,
        through: {
          attributes: [],
        },
        as: "genres",
      },
    });

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

module.exports = { getBooks, getBooksById, getBooksByIdWithGenres };
