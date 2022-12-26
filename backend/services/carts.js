const Book = require("../models/Book");
const Cart = require("../models/Cart");
const { APIError, NotFoundError, BadRequestError } = require("../utils/errors");

class CartService {
  getCarts = async () => {
    try {
      const carts = await Cart.findAll();
      return carts;
    } catch (err) {
      throw new APIError(err);
    }
  };

  getCartsWithBooks = async (where) => {
    try {
      const cart = await Cart.findOne({
        where,
        include: {
          model: Book,
          through: {
            attributes: [],
          },
          as: "books",
        },
      });
      return cart;
    } catch (err) {
      throw new APIError(err);
    }
  };

  createCart = async (form) => {
    try {
      //TODO: User must be exist
      const cart = await Cart.create(form);
      return cart;
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

  updateCart = async (id, form) => {
    try {
      //TODO: User must be exist
      let cart = await Cart.findByPk(id);
      if (!cart) throw new BadRequestError();
      cart = await cart.update(form);
      return cart;
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

  deleteCart = async (id) => {
    try {
      let cart = await Cart.findByPk(id);
      if (!cart) throw new BadRequestError();
      await cart.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };
}

const cartService = new CartService();

module.exports = cartService;
