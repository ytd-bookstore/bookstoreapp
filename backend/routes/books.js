const express = require("express");

const controller = require("../controllers/books");
const jwtToken = require("../utils/jwtToken");

const router = express.Router();

router.get("/", controller.getBooks);
router.get("/:id", controller.getBooksById);
router.get(
  "/:id/genres",
  jwtToken.authenticateToken,
  controller.getBooksByIdWithGenres
);
router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);
router.get("/search/:keyword", controller.searchBooks);

module.exports = router;
