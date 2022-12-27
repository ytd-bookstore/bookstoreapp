const express = require("express");

const controller = require("../controllers/favorites.js");

const router = express.Router();

router.get("/", controller.getFavorites);
router.get("/users/:user_id", controller.getFavoritesOfUserWithBooks);
router.post("/", controller.createFavorite);
router.put("/users/:user_id/books/:book_id", controller.updateFavorite);
router.delete("/users/:user_id/books/:book_id", controller.deleteFavorite);

module.exports = router;
