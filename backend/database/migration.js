const Address = require("../models/Address");
const Book = require("../models/Book");
const BookGenre = require("../models/BookGenre");
const Cart = require("../models/Cart");
const CartBook = require("../models/CartBook");
const District = require("../models/District");
const Favorite = require("../models/Favorite");
const Genre = require("../models/Genre");
const Order = require("../models/Order");
const OrderBook = require("../models/OrderBook");
const User = require("../models/User");
const sequelize = require("./sequelize");

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

Book.belongsToMany(Genre, {
  through: BookGenre,
  foreignKey: "book_id",
  otherKey: "genre_id",
  as: "genres",
});

Genre.belongsToMany(Book, {
  through: BookGenre,
  foreignKey: "genre_id",
  otherKey: "book_id",
  as: "genres",
});

Book.hasMany(BookGenre, { foreignKey: "book_id" });
BookGenre.belongsTo(Book, { foreignKey: "book_id" });

Genre.hasMany(BookGenre, { foreignKey: "genre_id" });
BookGenre.belongsTo(Genre, { foreignKey: "genre_id" });

module.exports.migrate = function () {
  // Synchronization of database
  sequelize.sync({ force: false }).then(function () {
    console.log("Database Configured");
    sequelize.close();
  });
};
