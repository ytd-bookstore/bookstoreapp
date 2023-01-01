const request = require("supertest");
const bookService = require("../../services/books");
const baseURL = "http://localhost:3000/api";

describe("search books (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  let jwtToken = "";
  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return 200", async () => {
    const response = await request(baseURL)
      .get("/mobile/search/Prince")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("search books (invalid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).get("/mobile/search/Prince");
    expect(response.statusCode).toBe(401);
  });
});

describe("get books by id with genres (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  let jwtToken = "";
  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });
  it("should return 200", async () => {
    const response = await request(baseURL)
      .get("/mobile/books/1/genres")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get books by id with genres (valid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).get("/mobile/books/1/genres");
    expect(response.statusCode).toBe(401);
  });
});
