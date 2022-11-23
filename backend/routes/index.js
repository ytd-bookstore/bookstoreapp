const express = require("express");

const controller = require("../controllers/index");

const router = express.Router();

router.use("/users", controller.users);
router.use("/books", controller.books);
router.use("/genres", controller.genres);

module.exports = router;
