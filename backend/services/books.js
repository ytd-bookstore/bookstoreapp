const Book = require("../models/Book");

const getBooks = async (req, res) => {
  res.json(await Book.findAll());
};

const getBooksById = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found!" });
  }
  res.json(book);
};

module.exports = { getBooks, getBooksById };
