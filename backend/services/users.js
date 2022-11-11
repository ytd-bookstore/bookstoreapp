const User = require("../models/User");

const getUsers = (req, res) => {
  res.json(User.findAll());
};

module.exports = { getUsers };
