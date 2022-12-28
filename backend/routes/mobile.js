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

module.exports = router;
