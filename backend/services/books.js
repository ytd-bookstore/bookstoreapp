const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { APIError, NotFoundError, BadRequestError } = require("../utils/errors");
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

  createBook = async (form) => {
    try {
      const book = await Book.create(form);
      return book;
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError" ||
        err instanceof BadRequestError
      ) {
        throw err;
      }
      throw new APIError();
    }
  };

  updateBook = async (id, form) => {
    try {
      let book = await Book.findByPk(id);
      if (!book) throw new BadRequestError();
      book = await book.update(form);
      return book;
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError" ||
        err instanceof BadRequestError
      ) {
        throw err;
      }
      throw new APIError();
    }
  };

  deleteBook = async (id) => {
    try {
      let book = await Book.findByPk(id);
      if (!book) throw new BadRequestError();
      await book.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };

  searchBooks = async (keyword) => {
    try {
      const books = await Book.findAll({
        where: {
          title: {
            [Op.like]: `%${keyword}%`,
          },
        },
      });
      return books;
    } catch (err) {
      throw new APIError();
    }
  };
}

const bookService = new BookService();

module.exports = bookService;
