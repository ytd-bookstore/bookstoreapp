const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class CartBook extends Model {}

CartBook.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },

    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
  },
  {
    sequelize,
    modelName: "CartBook",
    timestamps: false,
  }
);

module.exports = CartBook;
