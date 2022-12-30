const authService = require("../../services/auth");
const userService = require("../../services/users");
const migrate = require("../../database/migration");

describe("register", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  beforeAll(async () => {
    const response = await authService.register(newUser);
    newUser.id = response.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return registered user", async () => {
    const response = await userService.getUsersById(newUser.id);
    expect(response).not.toBe(null);
  });
});

describe("login", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  const credentials = {
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  beforeAll(async () => {
    const response = await authService.register(newUser);
    newUser.id = response.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return jwt token", async () => {
    const response = await authService.login(credentials);
    expect(response).not.toBe(null);
  });
});

describe("adminlogin", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  const credentials = {
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  beforeAll(async () => {
    const response = await authService.register(newUser);
    newUser.id = response.id;
    await userService.updateUser(newUser.id, { is_admin: true });
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return jwt token", async () => {
    const response = await authService.adminlogin(credentials);
    expect(response).not.toBe(null);
  });
});
