const authService = require("../../services/auth");
const userService = require("../../services/users");
const migrate = require("../../database/migration");
const { BadRequestError } = require("../../utils/errors");

describe("register with valid information", () => {
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
  it("should return jwt token", async () => {
    const response = await userService.getUsersById(newUser.id);
    expect(response).not.toBe(null);
  });
});

describe("register with already existing email", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  const newUser2 = {
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
  it("should return an error", async () => {
    expect(async () => await authService.register(newUser2)).rejects.toThrow(
      new BadRequestError("Email must be unique!")
    );
  });
});

describe("login with valid information", () => {
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

describe("login with a non-existing user", () => {
  const credentials = {
    email: "nonexisting@user.com",
    password: "securepassword",
  };

  it("should return an error", async () => {
    expect(async () => await authService.login(credentials)).rejects.toThrow(
      new BadRequestError("Email does not match with any user!")
    );
  });
});

describe("login with the wrong password", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  const credentials = {
    email: "johndoe@gmail.com",
    password: "wrongpassword",
  };

  beforeAll(async () => {
    const response = await authService.register(newUser);
    newUser.id = response.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(async () => await authService.login(credentials)).rejects.toThrow(
      new BadRequestError("Wrong password!")
    );
  });
});

describe("admin login with valid information", () => {
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

describe("admin login with a non-existing user", () => {
  const credentials = {
    email: "onexisting@user.com",
    password: "securepassword",
  };

  it("should return an error", async () => {
    expect(
      async () => await authService.adminlogin(credentials)
    ).rejects.toThrow(
      new BadRequestError("Email does not match with any user!")
    );
  });
});

describe("admin login with the wrong password", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    password: "securepassword",
  };

  const credentials = {
    email: "johndoe@gmail.com",
    password: "wrongpassword",
  };

  beforeAll(async () => {
    const response = await authService.register(newUser);
    newUser.id = response.id;
    await userService.updateUser(newUser.id, { is_admin: true });
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(async () => await authService.login(credentials)).rejects.toThrow(
      new BadRequestError("Wrong password!")
    );
  });
});
