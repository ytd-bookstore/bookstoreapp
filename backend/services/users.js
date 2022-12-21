const User = require("../models/User");
const Address = require("../models/Address");

const { NotFoundError, APIError, BadRequestError } = require("../utils/errors");

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
      if (!user) throw new BadRequestError();
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
}

const userService = new UserService();

module.exports = userService;
