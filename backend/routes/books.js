const express = require("express");

const controller = require("../controllers/books");
const tokenService = require("../utils/tokenService");

const router = express.Router();

router.get("/", tokenService.authToken, controller.getBooks);
router.get("/:id", tokenService.authToken, controller.getBooksById);
router.get(
  "/:id/genres",
  tokenService.authToken,
  controller.getBooksByIdWithGenres
);
router.post("/", tokenService.authAdminToken, controller.createBook);
router.put("/:id", tokenService.authAdminToken, controller.updateBook);
router.delete("/:id", tokenService.authAdminToken, controller.deleteBook);
router.get("/search/:keyword", tokenService.authToken, controller.searchBooks);

module.exports = router;
