const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class BookGenre extends Model {}

BookGenre.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "BookGenre",
    timestamps: false,
  }
);

module.exports = BookGenre;
