const Address = require("../models/Address");
const Book = require("../models/Book");
const Cart = require("../models/Cart");
const CartBook = require("../models/CartBook");
const District = require("../models/District");
const Favorite = require("../models/Favorite");
const Order = require("../models/Order");
const OrderBook = require("../models/OrderBook");
const User = require("../models/User");
const sequelize = require("./sequelize");

module.exports.migrate = function () {
  // Assosiations - Foreign Keys
  Address.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Order.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  Order.belongsTo(Address, {
    foreignKey: "address_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  OrderBook.belongsTo(Order, {
    foreignKey: "order_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  OrderBook.belongsTo(Book, {
    foreignKey: "book_id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  Favorite.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Favorite.belongsTo(Book, {
    foreignKey: "book_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Cart.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  CartBook.belongsTo(Cart, {
    foreignKey: "cart_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  CartBook.belongsTo(Book, {
    foreignKey: "book_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Synchronization of database
  sequelize.sync({ force: false }).then(function () {
    console.log("Database Configured");
    sequelize.close();
  });
};
