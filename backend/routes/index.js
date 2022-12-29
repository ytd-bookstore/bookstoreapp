const express = require("express");

const userRouter = require("./users");
const bookRouter = require("./books");
const genreRouter = require("./genres");
const addressRouter = require("./addresses");
const favoriteRouter = require("./favorites");
const cartRouter = require("./carts");
const orderRouter = require("./orders");
const mobileRouter = require("./mobile");
const authRouter = require("./auth");

const router = express.Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/genres", genreRouter);
router.use("/addresses", addressRouter);
router.use("/favorites", favoriteRouter);
router.use("/carts", cartRouter);
router.use("/orders", orderRouter);
router.use("/mobile", mobileRouter);
router.use("/auth", authRouter);

module.exports = router;
