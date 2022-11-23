const Book = require("../models/Book");
const Genre = require("../models/Genre");
const { InvalidQueryError } = require("../utils/errors");

const getGenres = async (req, res, next) => {
  try {
    const { name, ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const genres = await Genre.findAll({
      where: { name },
    });

    res.json(genres);
  } catch (err) {
    next(err);
  }
};

const getGenresById = async (req, res, next) => {
  try {
    const { ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const id = req.params.id;
    const genre = await Genre.findByPk(id);

    if (!genre)
      throw new APIError(
        httpStatusCode.NOT_FOUND,
        "Genre not found!",
        req.originalUrl
      );

    res.json(genre);
  } catch (err) {
    next(err);
  }
};

const getGenresByIdWithBooks = async (req, res, next) => {
  try {
    const { ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const id = req.params.id;
    const genre = await Genre.findByPk(id, {
      include: {
        model: Book,
        through: {
          attributes: [],
        },
        as: "books",
      },
    });

    if (!genre)
      throw new APIError(
        httpStatusCode.NOT_FOUND,
        "Genre not found!",
        req.originalUrl
      );

    res.json(genre);
  } catch (err) {
    next(err);
  }
};

module.exports = { getGenres, getGenresById, getGenresByIdWithBooks };
