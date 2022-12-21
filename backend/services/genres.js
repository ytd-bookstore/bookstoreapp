const Book = require("../models/Book");
const Genre = require("../models/Genre");
const { APIError, NotFoundError } = require("../utils/errors");

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
}

const genreService = new GenreService();

module.exports = genreService;
