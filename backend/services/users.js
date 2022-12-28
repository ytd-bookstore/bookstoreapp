const User = require("../models/User");
const Address = require("../models/Address");
const Crypto = require("crypto");

const { NotFoundError, APIError, BadRequestError } = require("../utils/errors");
const jwtToken = require("../utils/jwtToken");

class UserService {
  getUsers = async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (err) {
      throw new APIError();
    }
  };

  getUsersById = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new NotFoundError();
      return user;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new APIError();
    }
  };

  getUsersByIdWithAddress = async (id) => {
    try {
      const user = await User.findByPk(id, {
        include: {
          model: Address,
          as: "address",
        },
      });
      if (!user) throw new NotFoundError();
      return user;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new APIError();
    }
  };

  createUser = async (form) => {
    try {
      const user = await User.create(form);
      return user;
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

  updateUser = async (id, form) => {
    try {
      let user = await User.findByPk(id);
      if (!user) throw new BadRequestError();
      user = await user.update(form);
      return user;
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

  updateUserWithAddress = async (id, form) => {
    try {
      let user = await User.findByPk(id);
      if (!user || !form.address) throw new BadRequestError();

      let response = await Address.findAll({ where: { user_id: id } });
      let address = response[0];

      form.address.user_id = id;
      if (!address) {
        address = await Address.create(form.address);
      } else {
        address = await address.update(form.address);
      }
      user = await user.update(form);

      user.dataValues.address = address;
      return user;
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

  deleteUser = async (id) => {
    try {
      let user = await User.findByPk(id);
      if (!user) throw new BadRequestError();
      await user.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };

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
      return jwtToken.generateAccessToken(user.toJSON());
    } catch (err) {
      console.log(err);
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

const userService = new UserService();

module.exports = userService;
