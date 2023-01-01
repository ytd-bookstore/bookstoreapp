const userService = require("../../services/users");
const cartService = require("../../services/carts");
const migrate = require("../../database/migration");
const { BadRequestError } = require("../../utils/errors");

describe("add book to cart (Valid User and Book ID)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
    await cartService.addBookToCart(newUser.id, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("add book to cart (Invalid User ID)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(async () => await cartService.addBookToCart(-5, 1)).rejects.toThrow(
      new BadRequestError("Invalid user id.")
    );
  });
});

describe("add book to cart (Non-existing User ID)", () => {
  it("should return an error", async () => {
    expect(
      async () => await cartService.addBookToCart(1000000, 1)
    ).rejects.toThrow(new BadRequestError("User does not exist."));
  });
});

describe("add book to cart (Invalid Book ID)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(
      async () => await cartService.addBookToCart(newUser.id, -3)
    ).rejects.toThrow(new BadRequestError("Invalid book id."));
  });
});

describe("add book to cart (Non-existing Book ID)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(
      async () => await cartService.addBookToCart(newUser.id, 1000000)
    ).rejects.toThrow(new BadRequestError("Book does not exist."));
  });
});

describe("get cart of user with books (Valid User Id and Non-empty Cart)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
    await cartService.addBookToCart(newUser.id, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("get cart of user with books (Invalid User ID)", () => {
  it("should return an error", async () => {
    expect(
      async () => await cartService.getCartOfUserWithBooks(-1)
    ).rejects.toThrow(new BadRequestError("Invalid user id."));
  });
});

describe("get cart of user with books (Non-existing User ID)", () => {
  it("should return an error", async () => {
    expect(
      async () => await cartService.getCartOfUserWithBooks(1000000)
    ).rejects.toThrow(new BadRequestError("User does not exist."));
  });
});

describe("remove book from cart (Valid User and Book ID) and a cart that contains the book", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
    await cartService.addBookToCart(newUser.id, 1);
    await cartService.removeBookFromCart(newUser.id, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with no book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(false);
  });
});

describe("remove book from cart (Invalid User ID)", () => {
  it("should return cart with no book in it", async () => {
    expect(
      async () => await cartService.removeBookFromCart(-1, 1)
    ).rejects.toThrow(new BadRequestError("Invalid user id."));
  });
});

describe("remove book from cart (Non-existing User ID)", () => {
  it("should return an error", async () => {
    expect(
      async () => await cartService.removeBookFromCart(10000000, 1)
    ).rejects.toThrow(new BadRequestError("User does not exist."));
  });
});

describe("remove book from cart (Invalid Book ID)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(
      async () => await cartService.removeBookFromCart(newUser.id, -1)
    ).rejects.toThrow(new BadRequestError("Invalid book id."));
  });
});

describe("remove book from cart (Non existing Book ID)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return an error", async () => {
    expect(
      async () => await cartService.removeBookFromCart(newUser.id, 1000000)
    ).rejects.toThrow(new BadRequestError("Book does not exist."));
  });
});
