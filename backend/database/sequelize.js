const Sequelize = require("sequelize");

const dbConfig = require("./dbConfigLocal.json");

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
