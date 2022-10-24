const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    author: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    edition: {
      type: DataTypes.STRING,
    },

    format: {
      type: DataTypes.STRING,
    },

    isbn: {
      type: DataTypes.STRING,
    },

    page: {
      type: DataTypes.STRING,
    },

    rating: {
      type: DataTypes.FLOAT,
    },

    rating_count: {
      type: DataTypes.INTEGER,
    },

    image: {
      type: DataTypes.BLOB,
    },

    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },

    genres: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

module.exports = Book;
