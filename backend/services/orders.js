const Book = require("../models/Book");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const OrderBook = require("../models/OrderBook");
const User = require("../models/User");
const { APIError, NotFoundError, BadRequestError } = require("../utils/errors");

class OrderService {
  getOrders = async () => {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (err) {
      throw new APIError(err);
    }
  };

  getOrdersWithBooks = async (where) => {
    try {
      const order = await Order.findAll({
        where,
        include: {
          model: Book,
          through: {
            attributes: [],
          },
          as: "books",
        },
      });
      return order;
    } catch (err) {
      console.log(err);
      throw new APIError(err);
    }
  };

  getOrderOfUserWithBooks = async (user_id) => {
    try {
      const order = await Order.findAll({
        where: { user_id },
        include: {
          model: Book,
          through: {
            attributes: [],
          },
          as: "books",
        },
      });
      return order;
    } catch (err) {
      console.log(err);
      throw new APIError(err);
    }
  };

  createOrder = async (form) => {
    try {
      //TODO: User must be exist
      const order = await Order.create(form);
      return order;
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

  updateOrder = async (id, form) => {
    try {
      //TODO: User must be exist
      let order = await Order.findByPk(id);
      if (!order) throw new BadRequestError();
      order = await order.update(form);
      return order;
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

  deleteOrder = async (id) => {
    try {
      let order = await Order.findByPk(id);
      if (!order) throw new BadRequestError();
      await order.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };

  checkout = async (user_id, form) => {
    try {
      if (!this.#validateCardInformation(form)) throw new BadRequestError();
      const user = await User.findByPk(user_id);
      if (!user) throw new BadRequestError();
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
      if (!cart) throw new BadRequestError();
      const order = await Order.create({
        user_id,
        total: cart.total,
        status: "Order Placed",
      });

      for (let i = 0; i < cart.books.length; i++) {
        await OrderBook.create({
          order_id: order.id,
          book_id: cart.books[i].id,
        });
      }
      await cart.destroy();
      return;
    } catch (err) {
      console.log(err);
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };

  #validateCardInformation = (form) => {
    if (
      form.name.length != 0 &&
      form.surname.length != 0 &&
      form.cardNumber.length == 16 &&
      0 < parseInt(form.month) &&
      parseInt(form.month) <= 12 &&
      parseInt(form.year) < 2030 &&
      form.cvv.length == 3
    ) {
      return true;
    }
    return false;
  };
}

const orderService = new OrderService();

module.exports = orderService;
