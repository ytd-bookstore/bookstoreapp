const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Address extends Model {}

Address.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isInt: true,
      },
    },

    address_line: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "Addresses",
    timestamps: false,
  }
);

module.exports = Address;
