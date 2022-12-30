const genreService = require("../../services/genres");
const migrate = require("../../database/migration");

describe("get genres", () => {
  it("should return genres", async () => {
    const response = await genreService.getGenres();
    expect(response.length >= 1).toBe(true);
  });
});

describe("get genres by id with books", () => {
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
