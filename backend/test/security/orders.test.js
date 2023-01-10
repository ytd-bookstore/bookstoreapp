const request = require("supertest");
const baseURL =
  "http://ytd-bookstore.eba-96se7p2k.eu-central-1.elasticbeanstalk.com/api";

describe("chekout (valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  const cardInformation = {
    name: "abcabc",
    surname: "abcabc",
    cardNumber: "1111111111111111",
    month: "12",
    cvv: "111",
    year: "2022",
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 201 or 400", async () => {
    const response = await request(baseURL)
      .post("/mobile/checkout")
      .send(cardInformation)
      .set("Authorization", "Bearer " + jwtToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.statusCode == 201 || response.statusCode == 400).toBe(true);
  });
});

describe("checkout (invalid)", () => {
  const cardInformation = {
    name: "abcabc",
    surname: "abcabc",
    cardNumber: "1111111111111111",
    month: "12",
    cvv: "111",
    year: "2022",
  };

  let jwtToken = "";

  it("should return user with address", async () => {
    const response = await request(baseURL)
      .get("/mobile/checkout")
      .send(cardInformation)
      .set("Authorization", "Bearer " + jwtToken)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(401);
  });
});

describe("get orders of use with books(valid)", () => {
  const credentials = {
    email: "test@test.com",
    password: "test",
  };

  let jwtToken;

  beforeAll(async () => {
    jwtToken = await request(baseURL).post("/auth/login").send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });

  it("should return status code 200 or 400", async () => {
    const response = await request(baseURL)
      .get("/mobile/orders/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get orders of use with books(valid)", () => {
  let jwtToken = "";

  it("should return status code 200 or 400", async () => {
    const response = await request(baseURL)
      .get("/mobile/orders/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});
