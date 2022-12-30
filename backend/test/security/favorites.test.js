const request = require("supertest");
const baseURL = "http://localhost:3000/api";

describe("create a favorite (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  const favoriteForm = {
    book_id: 1,
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 200", async () => {
    const response = await request(baseURL)
      .post("/mobile/favorites/books")
      .send(favoriteForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(201);
  });
});

describe("create a favorite (invalid)", () => {
  const favoriteForm = {
    book_id: 1,
  };

  let jwtToken = "";

  it("should return status code 401", async () => {
    const response = await request(baseURL)
      .post("/mobile/favorites/books")
      .send(favoriteForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});

describe("get favorites of user with books (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 200", async () => {
    const response = await request(baseURL)
      .get("/mobile/favorites/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get favorites of user with books (invalid)", () => {
  let jwtToken = "";
  it("should return status code 401", async () => {
    const response = await request(baseURL)
      .get("/mobile/favorites/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});

describe("delete favorite (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 200", async () => {
    const response = await request(baseURL)
      .get("/mobile/favorites/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("delete favorite (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  const favoriteForm = {
    book_id: 1,
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 204", async () => {
    const response = await request(baseURL)
      .delete("/mobile/favorites/books")
      .send(favoriteForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(204);
  });
});

describe("delete favorite (invalid)", () => {
  const favoriteForm = {
    book_id: 1,
  };

  let jwtToken = "";
  it("should return status code 401", async () => {
    const response = await request(baseURL)
      .delete("/mobile/favorites/books")
      .send(favoriteForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});
