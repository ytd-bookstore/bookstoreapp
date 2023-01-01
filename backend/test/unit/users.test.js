const addressService = require("../../services/addresses");
const userService = require("../../services/users");
const migrate = require("../../database/migration");

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

describe("get user by id with address (non existing user)", () => {
  it("should return user with address", async () => {
    expect(
      async () => await orderService.getOrderOfUserWithBooks(12368)
    ).rejects.toThrowError();
  });
});

describe("get user by id with address (invalid user id)", () => {
  it("should return user with address", async () => {
    expect(
      async () => await orderService.getOrderOfUserWithBooks(-1)
    ).rejects.toThrowError();
  });
});

describe("update user by id with address", () => {
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

describe("update user by id with address (non existing user)", () => {
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
  it("should return user with address", async () => {
    expect(
      async () =>
        await userService.updateUserWithAddress(3123213, updatedUserData)
    ).rejects.toThrowError();
  });
});

describe("update user by id with address (invalid user id)", () => {
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
  it("should return user with address", async () => {
    expect(
      async () => await userService.updateUserWithAddress(-1, updatedUserData)
    ).rejects.toThrowError();
  });
});

describe("update user", () => {
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

describe("update user (non-existing user)", () => {
  const updatedUserData = {
    name: "Johnny",
    surname: "Deer",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
  };

  it("should return user with address", async () => {
    expect(
      async () => await userService.updateUser(2312131, updatedUserData)
    ).rejects.toThrowError();
  });
});

describe("update user (invalid user id)", () => {
  const updatedUserData = {
    name: "Johnny",
    surname: "Deer",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: false,
  };

  it("should return user with address", async () => {
    expect(
      async () => await userService.updateUser(-1, updatedUserData)
    ).rejects.toThrowError();
  });
});
