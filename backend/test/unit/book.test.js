const bookService = require("../../services/books");
const migrate = require("../../database/migration");

describe("search books", () => {
  it("should return the searched book", async () => {
    const response = await bookService.searchBooks("Prince");
    expect(response.length >= 1).toBe(true);
  });
});

describe("get books by id with genres", () => {
  it("should return the book with its genres", async () => {
    const response = await bookService.getBooksByIdWithGenres(2);

    expect(response.genres.length >= 0).toBe(true);
  });
});

describe("update books", () => {
  const newBook = {
    title: "Kucukprens",
    author: "Kucukprens",
    price: 12,
    description: "adsdad",
    edition: "First",
    format: "Hardcover",
    page: 122,
    rating: 3.64,
    rating_count: 12333,
    image_url: "",
    stock: 13,
  };

  const updatedBook = {
    title: "Kucukprens",
    author: "Kucukprens",
    price: 12,
    description: "adsdad",
    edition: "First",
    format: "Hardcover",
    page: 122,
    rating: 3.64,
    rating_count: 12333,
    image_url: "",
    stock: 14,
  };

  beforeAll(async () => {
    const bookResponse = await bookService.createBook(newBook);
    newBook.id = bookResponse.id;
  });

  it("should return the updated book", async () => {
    const response = await bookService.updateBook(newBook.id, updatedBook);
    expect(response.stock >= 14).toBe(true);
  });
});
