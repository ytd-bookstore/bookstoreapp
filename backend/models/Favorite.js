const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class Favorite extends Model {}

Favorite.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Favorite",
  }
);

module.exports = Favorite;
