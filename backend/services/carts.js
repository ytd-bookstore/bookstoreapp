const Book = require("../models/Book");
const Cart = require("../models/Cart");
const User = require("../models/User");
const CartBook = require("../models/CartBook");
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
      console.log(err);
      throw new APIError(err);
    }
  };

  getCartOfUserWithBooks = async (user_id) => {
    try {
      const cart = await Cart.findOne({
        where: { user_id },
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
      console.log(err);
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

  addBookToCart = async (user_id, book_id) => {
    try {
      const user = await User.findByPk(user_id);
      if (!user) throw new BadRequestError();
      const book = await Book.findByPk(book_id);
      if (!book) throw new BadRequestError();

      const [cart, created_cart] = await Cart.findOrCreate({
        where: { user_id },
        defaults: { user_id, total: 0 },
      });

      const [cartbook, created_cartbook] = await CartBook.findOrCreate({
        where: { cart_id: cart.id, book_id },
        defaults: { cart_id: cart.id, book_id },
      });
      if (created_cartbook) {
        await cart.update({ total: cart.total + book.price });
      }
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };

  removeBookFromCart = async (user_id, book_id) => {
    try {
      const user = await User.findByPk(user_id);
      if (!user) throw new BadRequestError();
      const book = await Book.findByPk(book_id);
      if (!book) throw new BadRequestError();

      const cart = await Cart.findOne({ where: { user_id } });
      if (!cart) throw new BadRequestError();

      const cartbook = await CartBook.findOne({
        where: { cart_id: cart.id, book_id },
      });
      if (!cartbook) throw new BadRequestError();

      cartbook.destroy();
      await cart.update({ total: cart.total - book.price });
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
