const express = require("express");

const controller = require("../controllers/mobile");
const tokenService = require("../utils/tokenService");

const router = express.Router();

router.get("/users/address", controller.getUserWithAddress);
router.get("/favorites/users", controller.getFavoritesOfUserWithBooks);
router.get("/carts/users", controller.getCartsOfUserWithBooks);
router.get("/orders/users", controller.getOrdersOfUserWithBooks);
router.get("/genres", controller.getGenres);
router.get("/genres/:id/books", controller.getGenreByIdWithBooks);
router.get("/books/:id/genres", controller.getBooksByIdWithGenres);
router.get("/search/:keyword", controller.searchBooks);
router.put("/users/address", controller.updateUserWithAddress);
router.post("/favorites/books", controller.createFavorite);
router.post("/carts/books", controller.addBookToCart);
router.post("/checkout", controller.checkout);
router.delete("/carts/books", controller.removeBookFromCart);
router.delete("/favorites/books", controller.deleteFavorite);

module.exports = router;
