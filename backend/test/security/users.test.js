const request = require("supertest");
const userService = require("../../services/users");
const baseURL = "http://localhost:3000/api";

describe("get user by id with address - security test (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  let jwtToken = "";

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
  });

  it("should return user with address", async () => {
    const response = await request(baseURL)
      .get("/mobile/users/address")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get user by id with address - security test (invalid)", () => {
  let jwtToken = "";

  it("should return user with address", async () => {
    const response = await request(baseURL)
      .get("/mobile/users/address")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});
