const request = require("supertest");
const baseURL = "http://localhost:3000/api";

describe("get genres (valid)", () => {
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
      .get("/mobile/genres")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get genres (invalid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).get("/mobile/genres");
    expect(response.statusCode).toBe(401);
  });
});

describe("get genres by id with books (valid)", () => {
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
      .get("/mobile/genres/1/books")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get genres by id with books (invalid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).get("/mobile/genres/1/books");
    expect(response.statusCode).toBe(401);
  });
});
