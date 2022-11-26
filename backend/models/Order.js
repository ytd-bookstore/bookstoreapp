const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM,
      values: ["Order Placed", "Order Ready", "In Transit", "Delivered"],
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    timestamps: false,
  }
);

module.exports = Order;
