const express = require("express");

const controller = require("../controllers/mobile");
const tokenService = require("../utils/tokenService");

const router = express.Router();

router.get(
  "/users/address",
  tokenService.authToken,
  controller.getUserWithAddress
);
router.get(
  "/favorites/users",
  tokenService.authToken,
  controller.getFavoritesOfUserWithBooks
);
router.get(
  "/carts/users",
  tokenService.authToken,
  controller.getCartsOfUserWithBooks
);
router.get(
  "/orders/users",
  tokenService.authToken,
  controller.getOrdersOfUserWithBooks
);
router.put(
  "/users/address",
  tokenService.authToken,
  controller.updateUserWithAddress
);
router.post(
  "/favorites/books",
  tokenService.authToken,
  controller.createFavorite
);
router.post("/carts/books", tokenService.authToken, controller.addBookToCart);
router.post("/checkout", tokenService.authToken, controller.checkout);
router.delete(
  "/carts/books",
  tokenService.authToken,
  controller.removeBookFromCart
);
router.delete(
  "/favorites/books",
  tokenService.authToken,
  controller.deleteFavorite
);
router.post("/users/auth/register/", controller.register);
router.post("/users/auth/login/", controller.login);
router.get(
  "/books/:id/genres",
  tokenService.authToken,
  controller.getBooksByIdWithGenres
);
router.get(
  "/genres/:id/books",
  tokenService.authToken,
  controller.getGenreByIdWithBooks
);
router.get("/genres", tokenService.authToken, controller.getGenres);
router.get("/search/:keyword", tokenService.authToken, controller.searchBooks);

module.exports = router;
