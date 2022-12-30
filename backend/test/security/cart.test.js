const request = require("supertest");
const baseURL = "http://localhost:3000/api";

describe("add book to cart (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  const cartForm = {
    book_id: 1,
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 204", async () => {
    const response = await request(baseURL)
      .post("/mobile/carts/books")
      .send(cartForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(204);
  });
});

describe("add book to cart (valid)", () => {
  const cartForm = {
    book_id: 1,
  };

  let jwtToken = "";

  it("should return status code 401", async () => {
    const response = await request(baseURL)
      .post("/mobile/carts/books")
      .send(cartForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});

describe("get cart of user with books (valid)", () => {
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
      .get("/mobile/carts/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get cart of user with books (invalid)", () => {
  let jwtToken = "";
  it("should return status code 401", async () => {
    const response = await request(baseURL)
      .get("/mobile/carts/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});

describe("remoce book from cart (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  const cartForm = {
    book_id: 1,
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 204", async () => {
    const response = await request(baseURL)
      .delete("/mobile/carts/books")
      .send(cartForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(204);
  });
});

describe("remoce book from cart (valid)", () => {
  const cartForm = {
    book_id: 1,
  };

  let jwtToken = "";
  it("should return status code 401", async () => {
    const response = await request(baseURL)
      .delete("/mobile/carts/books")
      .send(cartForm)
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});
