const userService = require("../services/users");
const { InvalidQueryError } = require("../utils/errors");
const httpStatusCode = require("../utils/httpStatusCode");

class UserController {
  getUsers = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      const users = await userService.getUsers();

      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  getUsersById = async (req, res, next) => {
    try {
      const { ...others } = req.query;

      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;

      const user = await userService.getUsersById(id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  getUsersByIdWithAddress = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const user = await userService.getUsersByIdWithAddress(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const user = await userService.createUser(req.body);
      res.status(httpStatusCode.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const user = await userService.updateUser(id, req.body);
      res.status(httpStatusCode.CREATED).json(user);
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
      const id = req.params.id;
      const user = await userService.updateUserWithAddress(id, req.body);
      res.status(httpStatusCode.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      await userService.deleteUser(id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };

  register = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      await userService.register(req.body);
      res.status(httpStatusCode.CREATED).send();
    } catch (err) {
      next(err);
    }
  };
}

const userController = new UserController();

module.exports = userController;
