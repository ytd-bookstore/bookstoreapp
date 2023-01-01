const genreService = require("../../services/genres");
const migrate = require("../../database/migration");
const { BadRequestError } = require("../../utils/errors");

//GET GENRES
describe("get genres", () => {
  it("should return genres", async () => {
    const response = await genreService.getGenres();
    expect(response.length >= 1).toBe(true);
  });
});

//GET GENRES BY ID WITH BOOKS
describe("get genres by id with books (existing genre id)", () => {
  let genre;
  beforeAll(async () => {
    const response = await genreService.getGenres();
    genre = response[0].toJSON();
  });
  it("should return genre with books", async () => {
    const response = await genreService.getGenresByIdWithBooks(genre.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("get genres by id with books (non-existing genre id)", () => {
  it("should return genre with books", async () => {
    expect(
      async () => await genreService.getGenresByIdWithBooks(12368)
    ).rejects.toThrow(new BadRequestError("Genre does not exist."));
  });
});

describe("get genres by id with books (invalid genre id)", () => {
  it("should return genre with books", async () => {
    expect(
      async () => await genreService.getGenresByIdWithBooks(-1)
    ).rejects.toThrow(new BadRequestError("Invalid genre id."));
  });
});
