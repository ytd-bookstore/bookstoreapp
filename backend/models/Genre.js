const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Genre extends Model {}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genre",
  }
);

module.exports = Genre;