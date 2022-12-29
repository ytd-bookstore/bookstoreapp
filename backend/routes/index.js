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
const tokenService = require("../utils/tokenService");

const router = express.Router();

router.use("/users", tokenService.authAdminToken, userRouter);
router.use("/books", tokenService.authAdminToken, bookRouter);
router.use("/genres", tokenService.authAdminToken, genreRouter);
router.use("/addresses", tokenService.authAdminToken, addressRouter);
router.use("/favorites", tokenService.authAdminToken, favoriteRouter);
router.use("/carts", tokenService.authAdminToken, cartRouter);
router.use("/orders", tokenService.authAdminToken, orderRouter);
router.use("/mobile", tokenService.authToken, mobileRouter);
router.use("/auth", authRouter);

module.exports = router;
