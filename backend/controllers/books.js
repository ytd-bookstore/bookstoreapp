const express = require("express");

const BookServices = require("../services/books");

const router = express.Router();

router.get("/", BookServices.getBooks);
router.get("/:id", BookServices.getBooksById);
router.get("/:id/genres", BookServices.getBooksByIdWithGenres);

module.exports = router;
