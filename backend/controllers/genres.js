const { InvalidQueryError } = require("../utils/errors");
const genreService = require("../services/genres");
const httpStatusCode = require("../utils/httpStatusCode");

class GenreController {
  getGenres = async (req, res, next) => {
    try {
      const { name, ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      let where = {};
      if (name) where = { ...where, name };

      const genres = await genreService.getGenres(where);

      res.json(genres);
    } catch (err) {
      next(err);
    }
  };

  getGenresById = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;

      const genre = await genreService.getGenresById(id);

      res.json(genre);
    } catch (err) {
      next(err);
    }
  };

  getGenreByIdWithBooks = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const id = req.params.id;
      const genre = await genreService.getGenresByIdWithBooks(id);

      res.json(genre);
    } catch (err) {
      next(err);
    }
  };

  createGenre = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const genre = await genreService.createGenre(req.body);
      res.status(httpStatusCode.CREATED).json(genre);
    } catch (err) {
      next(err);
    }
  };

  updateGenre = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const genre = await genreService.updateGenre(id, req.body);
      res.status(httpStatusCode.CREATED).json(genre);
    } catch (err) {
      next(err);
    }
  };

  deleteGenre = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      await genreService.deleteGenre(id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}

const genreController = new GenreController();

module.exports = genreController;
