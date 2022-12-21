const express = require("express");

const controller = require("../controllers/genres");

const router = express.Router();

router.get("/", controller.getGenres);
router.get("/:id", controller.getGenresById);
router.get("/:id/books", controller.getGenresByIdWithBooks);

module.exports = router;
