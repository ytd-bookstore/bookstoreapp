const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class CartBook extends Model {}

CartBook.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CartBook",
  }
);

module.exports = CartBook;
