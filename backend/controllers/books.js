const express = require("express");

const userService = require("../services/books");

const router = express.Router();

router.get("/", userService.getBooks);
router.get("/:id", userService.getBooksById);
router.get("/:id/genres", userService.getBooksByIdWithGenres);

module.exports = router;
