const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },

    //Remove
    address_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },

    total: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isFloat: true,
      },
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
