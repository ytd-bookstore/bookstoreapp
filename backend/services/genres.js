const Book = require("../models/Book");
const Genre = require("../models/Genre");
const { APIError, NotFoundError, BadRequestError } = require("../utils/errors");

class GenreService {
  getGenres = async (where) => {
    try {
      const genres = await Genre.findAll({ where });
      return genres;
    } catch (err) {
      throw new APIError(err);
    }
  };

  getGenresById = async (id) => {
    try {
      const genre = await Genre.findByPk(id);
      if (!genre) throw new NotFoundError();
      return genre;
    } catch (err) {
      throw new APIError(err);
    }
  };

  getGenresByIdWithBooks = async (id) => {
    try {
      const genre = await Genre.findByPk(id, {
        include: {
          model: Book,
          through: {
            attributes: [],
          },
          as: "books",
        },
      });
      if (!genre) throw new NotFoundError();
      return genre;
    } catch (err) {
      throw new APIError(err);
    }
  };
  createGenre = async (form) => {
    try {
      const genre = await Genre.create(form);
      return genre;
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

  updateGenre = async (id, form) => {
    try {
      let genre = await Genre.findByPk(id);
      if (!genre) throw new BadRequestError();
      genre = await genre.update(form);
      return genre;
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

  deleteGenre = async (id) => {
    try {
      let genre = await Genre.findByPk(id);
      if (!genre) throw new BadRequestError();
      await genre.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };
}

const genreService = new GenreService();

module.exports = genreService;
