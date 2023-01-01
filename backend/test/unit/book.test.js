const bookService = require("../../services/books");
const migrate = require("../../database/migration");
const { BadRequestError } = require("../../utils/errors");

describe("search books (valid name)", () => {
  it("should return the searched book", async () => {
    const response = await bookService.searchBooks("Prince");
    expect(response.length >= 1).toBe(true);
  });
});

describe("search books (invalid name)", () => {
  it("should return the searched book", async () => {
    const response = await bookService.searchBooks("Princeee");
    expect(response.length >= 1).toBe(false);
  });
});

describe("get books by id with genres  Valid Book ID)", () => {
  it("should return the book with its genres", async () => {
    const response = await bookService.getBooksByIdWithGenres(2);

    expect(response.genres.length >= 0).toBe(true);
  });
});

describe("get books by id with genres (Invalid Book ID)", () => {
  it("should return the book with its genres", async () => {
    expect(
      async () => await bookService.getBooksByIdWithGenres(-5)
    ).rejects.toThrow(new BadRequestError("Invalid book id."));
  });
});

describe("get books by id with genres (Non-existing Book ID)", () => {
  it("should return the book with its genres", async () => {
    const response = await bookService.getBooksByIdWithGenres(1005);

    expect(response.genres.length >= 0).toBe(true);
  });
});

describe("update books (Valid Book Information and book ID)", () => {
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

describe("update books (Invalid Book Information", () => {
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
    stock: 14,
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
    stock: "stock",
  };

  beforeAll(async () => {
    const bookResponse = await bookService.createBook(newBook);
    newBook.id = bookResponse.id;
  });

  it("should return the updated book", async () => {
    expect(
      async () => await bookService.updateBook(newBook.id, updatedBook)
    ).rejects.toThrowError();
  });
});

describe("update books (Invalid Book ID)", () => {
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
    expect(
      async () => await bookService.updateBook(-5, updatedBook)
    ).rejects.toThrow(new BadRequestError("Invalid book id."));
  });
});

describe("update books (Non-existing Book ID)", () => {
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
    const response = await bookService.updateBook(1005, updatedBook);
    expect(response.stock >= 14).toBe(true);
  });
});
