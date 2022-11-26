const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Address extends Model {}

Address.init(
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
