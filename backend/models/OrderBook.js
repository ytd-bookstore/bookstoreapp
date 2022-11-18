const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class OrderBook extends Model {}

OrderBook.init(
  {
    order_id: {
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
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderBook",
    timestamps: false,
  }
);

module.exports = OrderBook;
