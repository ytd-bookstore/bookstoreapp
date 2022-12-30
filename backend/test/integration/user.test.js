// const request = require("supertest");
// const baseURL = "http://localhost:3000/api";

// describe("GET /users", () => {
//   const newUser = {
//     name: "John",
//     surname: "Doe",
//     email: "johndoe@gmail.com",
//     passwordHash: "28ghjd2xz5",
//     passwordSalt: "68nf9358jd",
//     is_admin: "false",
//   };

//   beforeAll(async () => {
//     const response = await request(baseURL).post("/users").send(newUser);
//     newUser.id = response.body.id;
//   });
//   afterAll(async () => {
//     await request(baseURL).delete(`/users/${newUser.id}`);
//   });
//   it("should return 200", async () => {
//     const response = await request(baseURL).get("/users");
//     expect(response.statusCode).toBe(200);
//   });
//   it("should return users", async () => {
//     const response = await request(baseURL).get("/users");
//     expect(response.body.length >= 1).toBe(true);
//   });
// });

// describe("POST /users", () => {
//   const newUser = {
//     name: "John",
//     surname: "Doe",
//     email: "johndoe@gmail.com",
//     passwordHash: "28ghjd2xz5",
//     passwordSalt: "68nf9358jd",
//     is_admin: "false",
//   };
//   afterAll(async () => {
//     await request(baseURL).delete(`/users/${newUser.id}`);
//   });
//   it("should create a new user", async () => {
//     const response = await request(baseURL).post("/users").send(newUser);
//     newUser.id = response.body.id;
//     const createdUser = response.body;
//     expect(response.statusCode).toBe(201);
//     expect(createdUser.name).toBe(newUser.name);
//     expect(createdUser.surname).toBe(newUser.surname);
//   });
// });

// describe("PUT /users", () => {
//   const newUser = {
//     name: "John",
//     surname: "Doe",
//     email: "johndoe@gmail.com",
//     passwordHash: "28ghjd2xz5",
//     passwordSalt: "68nf9358jd",
//     is_admin: "false",
//   };
//   beforeAll(async () => {
//     const response = await request(baseURL).post("/users").send(newUser);
//     newUser.id = response.body.id;
//   });
//   afterAll(async () => {
//     await request(baseURL).delete(`/users/${newUser.id}`);
//   });
//   it("should update item if it exists", async () => {
//     const response = await request(baseURL).put(`/users/${newUser.id}`).send({
//       name: "Jack",
//     });
//     expect(response.statusCode).toBe(201);
//     expect(response.body.name).toBe("Jack");
//   });
// });

// describe("DELETE /users", () => {
//   const newUser = {
//     name: "John",
//     surname: "Doe",
//     email: "johndoe@gmail.com",
//     passwordHash: "28ghjd2xz5",
//     passwordSalt: "68nf9358jd",
//     is_admin: "false",
//   };
//   beforeAll(async () => {
//     const response = await request(baseURL).post("/users").send(newUser);
//     newUser.id = response.body.id;
//   });

//   it("should delete the user", async () => {
//     await request(baseURL).delete(`/users/${newUser.id}`);
//     const response = await request(baseURL).get("/users");
//     const users = response.body;
//     const exists = users.find((user) => {
//       user.id == newUser.id;
//     });
//     expect(exists).toBe(undefined);
//   });
// });
