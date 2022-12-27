const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Cart extends Model {}

Cart.init(
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

    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Cart",
    timestamps: false,
  }
);

module.exports = Cart;
