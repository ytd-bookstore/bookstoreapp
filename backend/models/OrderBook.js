const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class OrderBook extends Model {}

OrderBook.init(
  {
    order_id: {
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
    modelName: "OrderBook",
    timestamps: false,
  }
);

module.exports = OrderBook;
