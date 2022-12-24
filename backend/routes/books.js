const express = require("express");

const controller = require("../controllers/books");

const router = express.Router();

router.get("/", controller.getBooks);
router.get("/:id", controller.getBooksById);
router.get("/:id/genres", controller.getBooksByIdWithGenres);
router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
