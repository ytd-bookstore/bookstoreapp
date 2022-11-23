const express = require("express");

const genreService = require("../services/genres");

const router = express.Router();

router.get("/", genreService.getGenres);
router.get("/:id", genreService.getGenresById);
router.get("/:id/books", genreService.getGenresByIdWithBooks);

module.exports = router;
