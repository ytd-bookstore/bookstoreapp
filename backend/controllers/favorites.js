const { InvalidQueryError } = require("../utils/errors");
const favoriteService = require("../services/favorites");
const httpStatusCode = require("../utils/httpStatusCode");

class FavoriteController {
  getFavorites = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const favorites = await favoriteService.getFavorites();

      res.json(favorites);
    } catch (err) {
      next(err);
    }
  };

  getFavoritesOfUserWithBooks = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user_id = req.params.user_id;
      const favorites = await favoriteService.getFavoritesOfUserWithBooks(
        user_id
      );

      res.json(favorites);
    } catch (err) {
      next(err);
    }
  };

  createFavorite = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const favorite = await favoriteService.createFavorite(req.body);
      res.status(httpStatusCode.CREATED).json(favorite);
    } catch (err) {
      next(err);
    }
  };

  updateFavorite = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user_id = req.params.user_id;
      const book_id = req.params.book_id;
      const favorite = await favoriteService.updateFavorite(
        user_id,
        book_id,
        req.body
      );
      res.status(httpStatusCode.CREATED).json(favorite);
    } catch (err) {
      next(err);
    }
  };

  deleteFavorite = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user_id = req.params.user_id;
      const book_id = req.params.book_id;
      await favoriteService.deleteFavorite(user_id, book_id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}

const favoriteController = new FavoriteController();

module.exports = favoriteController;
