const { InvalidQueryError } = require("../utils/errors");
const bookService = require("../services/books");
const httpStatusCode = require("../utils/httpStatusCode");

class BookController {
  getBooks = async (req, res, next) => {
    try {
      const { title, author, edition, ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      let where = {};
      if (title) where = { ...where, title };
      if (author) where = { ...where, author };
      if (edition) where = { ...where, edition };

      const books = await bookService.getBooks(where);
      res.json(books);
    } catch (err) {
      next(err);
    }
  };

  getBooksById = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;

      const book = await bookService.getBooksById(id);
      res.json(book);
    } catch (err) {
      next(err);
    }
  };

  getBooksByIdWithGenres = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const id = req.params.id;
      const book = await bookService.getBooksByIdWithGenres(id);
      res.json(book);
    } catch (err) {
      next(err);
    }
  };

  createBook = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const book = await bookService.createBook(req.body);
      res.status(httpStatusCode.CREATED).json(book);
    } catch (err) {
      next(err);
    }
  };

  updateBook = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const book = await bookService.updateBook(id, req.body);
      res.status(httpStatusCode.CREATED).json(book);
    } catch (err) {
      next(err);
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      await bookService.deleteBook(id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}

const bookController = new BookController();

module.exports = bookController;
