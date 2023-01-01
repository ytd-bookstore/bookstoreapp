const request = require("supertest");
const baseURL = "http://localhost:3000/api";

describe("GET /users (valid)", () => {
  const credentials = {
    email: "admin@admin.com",
    password: "admin",
  };

  let jwtToken = "";

  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    jwtToken = await request(baseURL)
      .post("/auth/adminlogin")
      .send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
    const response = await request(baseURL)
      .post("/users")
      .send(newUser)
      .set("Authorization", "Bearer " + jwtToken);
    newUser.id = response.body.id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/users/${newUser.id}`)
      .set("Authorization", "Bearer " + jwtToken);
  });
  it("should return 200", async () => {
    const response = await request(baseURL)
      .get("/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /users (invalid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).get("/users");
    expect(response.statusCode).toBe(401);
  });
});

describe("POST /users (valid)", () => {
  const credentials = {
    email: "admin@admin.com",
    password: "admin",
  };

  let jwtToken = "";

  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  beforeAll(async () => {
    jwtToken = await request(baseURL)
      .post("/auth/adminlogin")
      .send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/users/${newUser.id}`)
      .set("Authorization", "Bearer " + jwtToken);
  });
  it("should return 201", async () => {
    const response = await request(baseURL)
      .post("/users")
      .send(newUser)
      .set("Authorization", "Bearer " + jwtToken);
    newUser.id = response.body.id;
    expect(response.statusCode).toBe(201);
  });
});

describe("POST /users (invalid)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  it("should return 401", async () => {
    const response = await request(baseURL).post("/users").send(newUser);
    expect(response.statusCode).toBe(401);
  });
});

describe("PUT /users (valid)", () => {
  const credentials = {
    email: "admin@admin.com",
    password: "admin",
  };

  let jwtToken = "";
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  beforeAll(async () => {
    jwtToken = await request(baseURL)
      .post("/auth/adminlogin")
      .send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
    const response = await request(baseURL)
      .post("/users")
      .send(newUser)
      .set("Authorization", "Bearer " + jwtToken);
    newUser.id = response.body.id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/users/${newUser.id}`)
      .set("Authorization", "Bearer " + jwtToken);
  });
  it("should return 201", async () => {
    const response = await request(baseURL)
      .put(`/users/${newUser.id}`)
      .send({
        name: "Jack",
      })
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(201);
  });
});

describe("PUT /users (invalid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).put(`/users/1`).send({
      name: "Jack",
    });
    expect(response.statusCode).toBe(401);
  });
});

describe("DELETE /users (valid)", () => {
  const credentials = {
    email: "admin@admin.com",
    password: "admin",
  };

  let jwtToken = "";
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  beforeAll(async () => {
    jwtToken = await request(baseURL)
      .post("/auth/adminlogin")
      .send(credentials);
    jwtToken = jwtToken.text.slice(1, -1);
    const response = await request(baseURL)
      .post("/users")
      .send(newUser)
      .set("Authorization", "Bearer " + jwtToken);
    newUser.id = response.body.id;
  });

  it("should return 200", async () => {
    await request(baseURL)
      .delete(`/users/${newUser.id}`)
      .set("Authorization", "Bearer " + jwtToken);
    const response = await request(baseURL)
      .get("/users")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /users (invalid)", () => {
  it("should return 401", async () => {
    const response = await request(baseURL).delete(`/users/1`);
    expect(response.statusCode).toBe(401);
  });
});

describe("get user by id with address (valid)", () => {
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
      .get("/mobile/users/address")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(200);
  });
});

describe("get user by id with address (invalid)", () => {
  let jwtToken = "";

  it("should return 401", async () => {
    const response = await request(baseURL)
      .get("/mobile/users/address")
      .set("Authorization", "Bearer " + jwtToken);
    expect(response.statusCode).toBe(401);
  });
});
