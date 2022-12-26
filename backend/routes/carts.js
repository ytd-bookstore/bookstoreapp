const express = require("express");

const controller = require("../controllers/carts");

const router = express.Router();

router.get("/", controller.getCarts);
router.get("/books", controller.getCartsWithBooks);
router.get("/users/:user_id", controller.getCartsOfUserWithBooks);
router.post("/", controller.createCart);
router.put("/:id", controller.updateCart);
router.delete("/:id", controller.deleteCart);
router.post("/users/:user_id/books/:book_id", controller.addBookToCart);

module.exports = router;
