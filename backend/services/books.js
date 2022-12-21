const { APIError, NotFoundError } = require("../utils/errors");
const Book = require("../models/Book");
const Genre = require("../models/Genre");

class BookService {
  getBooks = async (where) => {
    try {
      const books = await Book.findAll({ where });
      return books;
    } catch (err) {
      throw new APIError();
    }
  };

  getBooksById = async (id) => {
    try {
      const book = await Book.findByPk(id);
      if (!book) throw new NotFoundError();
      return book;
    } catch (err) {
      throw new APIError();
    }
  };

  getBooksByIdWithGenres = async (id) => {
    try {
      const book = await Book.findByPk(id, {
        include: {
          model: Genre,
          through: {
            attributes: [],
          },
          as: "genres",
        },
      });
      return book;
    } catch (err) {
      throw new APIError();
    }
  };
}

const bookService = new BookService();

module.exports = bookService;
