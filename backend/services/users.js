const User = require("../models/User");
const Address = require("../models/Address");

const { InvalidQueryError, NotFoundError } = require("../utils/errors");

const getUsers = async (req, res, next) => {
  try {
    const { ...others } = req.query;
    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }
    let where = {};
    const users = await User.findAll({ where });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const { ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError(req.originalUrl);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getUsersByIdWithAddress = async (req, res, next) => {
  try {
    const { ...others } = req.query;

    if (Object.keys(others).length != 0) {
      throw new InvalidQueryError(req.originalUrl);
    }

    const id = req.params.id;
    const user = await User.findByPk(id, {
      include: {
        model: Address,
        as: "address",
      },
    });

    if (!user) {
      throw new NotFoundError(req.originalUrl);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUsersById, getUsersByIdWithAddress };
