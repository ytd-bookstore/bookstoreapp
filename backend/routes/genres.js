const express = require("express");

const controller = require("../controllers/genres");

const router = express.Router();

router.get("/", controller.getGenres);
router.get("/:id", controller.getGenresById);
router.get("/:id/books", controller.getGenreByIdWithBooks);
router.post("/", controller.createGenre);
router.put("/:id", controller.updateGenre);
router.delete("/:id", controller.deleteGenre);

module.exports = router;
