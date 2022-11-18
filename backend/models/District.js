const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class District extends Model {}

District.init(
  {
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "District",
    timestamps: false,
  }
);

module.exports = District;
