const { Sequelize } = require("sequelize");

const dbConfig = {
  database: "bookStoreDB",
  username: "user",
  password: "test1234",
  host: "localhost",
  dialect: "mysql",
};

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
