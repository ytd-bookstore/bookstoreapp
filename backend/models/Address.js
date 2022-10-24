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

    address: {
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

    postal_code: {
      type: DataTypes.STRING,
    },

    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "Addresses",
  }
);

module.exports = Address;
