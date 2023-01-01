const userService = require("../../services/users");
const migrate = require("../../database/migration");

describe("get all users", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return users", async () => {
    const response = await userService.getUsers();
    expect(response.length >= 1).toBe(true);
  });
});

describe("create a user", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should create a new user", async () => {
    const createdUser = await userService.createUser(newUser);
    newUser.id = createdUser.id;
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.surname).toBe(newUser.surname);
  });
});

describe("update a user", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should update item if it exists", async () => {
    const updatedUser = await userService.updateUser(newUser.id, {
      name: "Jack",
    });
    expect(updatedUser.name).toBe("Jack");
  });
});

describe("delete a user", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };
  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
  });

  it("should delete the user", async () => {
    await userService.deleteUser(newUser.id);
    const users = await userService.getUsers();
    const exists = users.find((user) => {
      user.id == newUser.id;
    });
    expect(exists).toBe(undefined);
  });
});
