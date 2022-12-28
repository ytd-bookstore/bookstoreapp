const userService = require("../services/users");
const favoriteService = require("../services/favorites");
const cartService = require("../services/carts");
const orderService = require("../services/orders");
const httpStatusCode = require("../utils/httpStatusCode");

class MobileController {
  getUserWithAddress = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user = req.user;
      const response = await userService.getUsersByIdWithAddress(user.id);
      res.json(response);
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
      const user = req.user;
      const favorites = await favoriteService.getFavoritesOfUserWithBooks(
        user.id
      );
      res.json(favorites);
    } catch (err) {
      next(err);
    }
  };

  getCartsOfUserWithBooks = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const user = req.user;
      const cart = await cartService.getCartOfUserWithBooks(user.id);

      res.json(cart);
    } catch (err) {
      next(err);
    }
  };

  getOrdersOfUserWithBooks = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const user = req.user;
      const order = await orderService.getOrderOfUserWithBooks(user.id);

      res.json(order);
    } catch (err) {
      next(err);
    }
  };

  updateUserWithAddress = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user = req.user;
      const response = await userService.updateUserWithAddress(
        user.id,
        req.body
      );
      res.status(httpStatusCode.CREATED).json(response);
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
      const user = req.user;
      const favorite = await favoriteService.createFavorite({
        user_id: user.id,
        book_id: req.body.book_id,
      });
      res.status(httpStatusCode.CREATED).json(favorite);
    } catch (err) {
      next(err);
    }
  };

  addBookToCart = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user_id = req.user.id;
      const book_id = req.body.book_id;
      await cartService.addBookToCart(user_id, book_id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };

  checkout = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user_id = req.user.id;
      await orderService.checkout(user_id, req.body);
      res.status(httpStatusCode.CREATED).send();
    } catch (err) {
      next(err);
    }
  };

  removeBookFromCart = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user_id = req.user.id;
      const book_id = req.body.book_id;
      await cartService.removeBookFromCart(user_id, book_id);
      res.status(httpStatusCode.NO_CONTENT).send();
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
      const user_id = req.user.id;
      const book_id = req.body.book_id;
      await favoriteService.deleteFavorite(user_id, book_id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}

const mobileController = new MobileController();

module.exports = mobileController;
