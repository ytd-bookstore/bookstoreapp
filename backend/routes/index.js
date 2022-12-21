const express = require("express");

const userRouter = require("./users");
const bookRouter = require("./books");
const genreRouter = require("./genres");
const addressRouter = require("./addresses");

const router = express.Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/genres", genreRouter);
router.use("/addresses", addressRouter);

module.exports = router;
