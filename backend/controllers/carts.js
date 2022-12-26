const { InvalidQueryError } = require("../utils/errors");
const cartService = require("../services/carts");
const httpStatusCode = require("../utils/httpStatusCode");

class CartController {
  getCarts = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const carts = await cartService.getCarts();

      res.json(carts);
    } catch (err) {
      next(err);
    }
  };

  getCartsWithBooks = async (req, res, next) => {
    try {
      const { user_id, ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      let where = {};
      if (user_id) where = { ...where, user_id };

      const cart = await cartService.getCartsWithBooks(where);

      res.json(cart);
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

      const user_id = req.params.user_id;
      const cart = await cartService.getCartOfUserWithBooks(user_id);

      res.json(cart);
    } catch (err) {
      next(err);
    }
  };

  createCart = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const cart = await cartService.createCart(req.body);
      res.status(httpStatusCode.CREATED).json(cart);
    } catch (err) {
      next(err);
    }
  };

  updateCart = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const cart = await cartService.updateCart(id, req.body);
      res.status(httpStatusCode.CREATED).json(cart);
    } catch (err) {
      next(err);
    }
  };

  deleteCart = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      await cartService.deleteCart(id);
      res.status(httpStatusCode.NO_CONTENT).send();
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
      const user_id = req.params.user_id;
      const book_id = req.params.book_id;
      const cart = await cartService.addBookToCart(user_id, book_id);
      res.status(httpStatusCode.CREATED).json(cart);
    } catch (err) {
      next(err);
    }
  };
}

const cartController = new CartController();

module.exports = cartController;
