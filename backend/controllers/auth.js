const authService = require("../services/auth");
const { InvalidQueryError } = require("../utils/errors");
const httpStatusCode = require("../utils/httpStatusCode");

class AuthController {
  register = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      await authService.register(req.body);
      res.status(httpStatusCode.CREATED).send();
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const token = await authService.login(req.body);
      res.status(httpStatusCode.CREATED).json(token);
    } catch (err) {
      next(err);
    }
  };

  adminlogin = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const token = await authService.adminlogin(req.body);
      res.status(httpStatusCode.CREATED).json(token);
    } catch (err) {
      next(err);
    }
  };
}

const authController = new AuthController();

module.exports = authController;
