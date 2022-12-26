const express = require("express");

const controller = require("../controllers/carts");

const router = express.Router();

router.get("/", controller.getCarts);
router.get("/:id", controller.getCartsWithBooks);
router.post("/", controller.createCart);
router.put("/:id", controller.updateCart);
router.delete("/:id", controller.deleteCart);

module.exports = router;
