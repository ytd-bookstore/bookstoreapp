const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

class User extends Model {}

User.init(
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

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(320),
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    passwordSalt: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        is: ["^(?:tru|fals)e$"],
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: false,
  }
);

module.exports = User;
