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

module.exports.dropTables = async () => {
  await District.drop();
  await OrderBook.drop();
  await CartBook.drop();
  await BookGenre.drop();
  await Favorite.drop();
  await Book.drop();
  await Cart.drop();
  await Order.drop();
  await Address.drop();
  await User.drop();
  await Genre.drop();

  console.log("All tables dropped!");
};
