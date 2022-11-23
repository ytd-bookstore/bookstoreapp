const express = require("express");

const bookService = require("../services/books");

const router = express.Router();

router.get("/", bookService.getBooks);
router.get("/:id", bookService.getBooksById);
router.get("/:id/genres", bookService.getBooksByIdWithGenres);

module.exports = router;
