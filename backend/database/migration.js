const Address = require("../models/Address");
const Book = require("../models/Book");
const BookGenre = require("../models/BookGenre");
const Cart = require("../models/Cart");
const CartBook = require("../models/CartBook");
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
  onDelete: "CASCADE",
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

Book.belongsToMany(Order, {
  through: OrderBook,
  foreignKey: "book_id",
  otherKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "order",
});

Order.belongsToMany(Book, {
  through: OrderBook,
  foreignKey: "order_id",
  otherKey: "book_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "books",
});

Book.belongsToMany(Cart, {
  through: CartBook,
  foreignKey: "book_id",
  otherKey: "cart_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "cart",
});

Cart.belongsToMany(Book, {
  through: CartBook,
  foreignKey: "cart_id",
  otherKey: "book_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "books",
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
  as: "books",
});

User.hasOne(Address, {
  foreignKey: "user_id",
  as: "address",
});

User.hasOne(Cart, {
  foreignKey: "user_id",
  as: "cart",
});

Book.hasMany(BookGenre, { foreignKey: "book_id" });
BookGenre.belongsTo(Book, { foreignKey: "book_id" });

Genre.hasMany(BookGenre, { foreignKey: "genre_id" });
BookGenre.belongsTo(Genre, { foreignKey: "genre_id" });

Cart.hasMany(CartBook, { foreignKey: "cart_id" });
CartBook.belongsTo(Cart, { foreignKey: "cart_id" });

Book.hasMany(CartBook, { foreignKey: "book_id" });
CartBook.belongsTo(Book, { foreignKey: "book_id" });

Order.hasMany(OrderBook, { foreignKey: "order_id" });
OrderBook.belongsTo(Order, { foreignKey: "order_id" });

Book.hasMany(OrderBook, { foreignKey: "book_id" });
OrderBook.belongsTo(Book, { foreignKey: "book_id" });

module.exports.migrate = function () {
  // Synchronization of database
  sequelize.sync({ force: false }).then(function () {
    console.log("Database Configured");
    sequelize.close();
  });
};
