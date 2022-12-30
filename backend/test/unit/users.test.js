const addressService = require("../../services/addresses");
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

describe("get user by id with address", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
  };
  const newAddress = {
    address_line: "ITU",
    city: "ISTANBUL",
    district: "RESITPASA",
    mobile: "8657456859",
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
    newAddress.user_id = response.id;
    await addressService.createAddress(newAddress);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });

  it("should return user with address", async () => {
    const user = await userService.getUsersByIdWithAddress(newUser.id);
    expect(user.address).not.toBe(null);
  });
});

describe("get user by id with address", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
  };
  const newAddress = {
    address_line: "ITU",
    city: "ISTANBUL",
    district: "RESITPASA",
    mobile: "8657456859",
  };
  const updatedUserData = {
    name: "Johnny",
    surname: "Deer",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
    address: {
      address_line: "EV",
      city: "TEKIRDAG",
      district: "SARAY",
      mobile: "8657456858",
    },
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
    newAddress.user_id = response.id;
    updatedUserData.id = response.id;
    await addressService.createAddress(newAddress);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });

  it("should return user with address", async () => {
    const user = await userService.updateUserWithAddress(
      newUser.id,
      updatedUserData
    );
    expect(user.address).not.toBe(null);
  });
});

describe("get user by id with address", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
  };
  const updatedUserData = {
    name: "Johnny",
    surname: "Deer",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
    updatedUserData.id = response.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });

  it("should return user with address", async () => {
    const user = await userService.updateUser(newUser.id, updatedUserData);
    expect(user.toJSON()).toStrictEqual(updatedUserData);
  });
});
