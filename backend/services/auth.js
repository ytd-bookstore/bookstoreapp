const User = require("../models/User");
const Crypto = require("crypto");

const { APIError, BadRequestError } = require("../utils/errors");
const tokenService = require("../utils/tokenService");

class AuthService {
  register = async (form) => {
    try {
      let user = await User.findOne({ where: { email: form.email } });
      if (user) throw new BadRequestError("Email must be unique!");
      const passwordSalt = Crypto.randomBytes(32).toString("hex");
      const passwordHash = Crypto.createHash("sha256")
        .update(form.password)
        .update(Crypto.createHash("sha256").update(passwordSalt).digest("hex"))
        .digest("hex");
      form.passwordHash = passwordHash;
      form.passwordSalt = passwordSalt;
      let newUser = await User.create(form);
      return newUser;
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

  login = async (form) => {
    try {
      let user = await User.findOne({ where: { email: form.email } });
      if (!user) {
        throw new BadRequestError("Email does not match with any user!");
      }
      const passwordHash = Crypto.createHash("sha256")
        .update(form.password)
        .update(
          Crypto.createHash("sha256").update(user.passwordSalt).digest("hex")
        )
        .digest("hex");
      if (passwordHash != user.passwordHash) {
        throw new BadRequestError("Wrong password!");
      }
      return tokenService.generateAccessToken(user.toJSON());
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

  adminlogin = async (form) => {
    try {
      let user = await User.findOne({ where: { email: form.email } });
      if (!user) {
        throw new BadRequestError("Email does not match with any user!");
      }
      if (!user.is_admin) {
        throw new BadRequestError("You are not an admin!");
      }
      const passwordHash = Crypto.createHash("sha256")
        .update(form.password)
        .update(
          Crypto.createHash("sha256").update(user.passwordSalt).digest("hex")
        )
        .digest("hex");
      if (passwordHash != user.passwordHash) {
        throw new BadRequestError("Wrong password!");
      }
      return tokenService.generateAccessToken(user.toJSON());
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
}

const authService = new AuthService();

module.exports = authService;
