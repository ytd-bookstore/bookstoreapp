const { InvalidQueryError } = require("../utils/errors");
const orderService = require("../services/orders");
const httpStatusCode = require("../utils/httpStatusCode");

class OrderController {
  getOrders = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const orders = await orderService.getOrders();

      res.json(orders);
    } catch (err) {
      next(err);
    }
  };

  getOrdersWithBooks = async (req, res, next) => {
    try {
      const { user_id, ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      let where = {};
      if (user_id) where = { ...where, user_id };

      const order = await orderService.getOrdersWithBooks(where);

      res.json(order);
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

      const user_id = req.params.user_id;
      const order = await orderService.getOrderOfUserWithBooks(user_id);

      res.json(order);
    } catch (err) {
      next(err);
    }
  };

  createOrder = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const order = await orderService.createOrder(req.body);
      res.status(httpStatusCode.CREATED).json(order);
    } catch (err) {
      next(err);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const order = await orderService.updateOrder(id, req.body);
      res.status(httpStatusCode.CREATED).json(order);
    } catch (err) {
      next(err);
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      await orderService.deleteOrder(id);
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
      const user_id = req.params.user_id;
      await orderService.checkout(user_id, req.body);
      res.status(httpStatusCode.CREATED).send();
    } catch (err) {
      next(err);
    }
  };
}

const orderController = new OrderController();

module.exports = orderController;
