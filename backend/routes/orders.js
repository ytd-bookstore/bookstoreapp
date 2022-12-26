const express = require("express");

const controller = require("../controllers/orders");

const router = express.Router();

router.get("/", controller.getOrders);
router.get("/books", controller.getOrdersWithBooks);
router.get("/users/:user_id", controller.getOrdersOfUserWithBooks);
router.post("/", controller.createOrder);
router.put("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);
router.post("/users/:user_id", controller.checkout);

module.exports = router;
