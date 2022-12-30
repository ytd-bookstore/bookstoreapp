const userService = require("../../services/users");
const cartService = require("../../services/carts");
const migrate = require("../../database/migration");

describe("add book to cart -> Valid User and Book ID", () => {
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

describe("add book to cart -> Invalid User ID", () => {
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
    await cartService.addBookToCart(-5, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("add book to cart -> Non-existing User ID", () => {
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
    await cartService.addBookToCart(100, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("add book to cart -> Invalid Book ID", () => {
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
    await cartService.addBookToCart(newUser.id, -3);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("add book to cart -> Non-existing Book ID", () => {
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
    await cartService.addBookToCart(newUser.id, 1008);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("get cart of user with books -> Valid User Id and Non-empty Cart", () => {
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

describe("get cart of user with books -> Invalid User ID", () => {
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
    await cartService.addBookToCart(-8, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("get cart of user with books -> Non-existing User ID", () => {
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
    await cartService.addBookToCart(80, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with a book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(true);
  });
});

describe("remove book from cart -> Valid User and Book ID and a cart that contains the book", () => {
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

describe("remove book from cart -> Invalid User ID", () => {
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
    await cartService.addBookToCart("sadsa", 1);
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

describe("remove book from cart -> Non-existing User ID", () => {
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
    await cartService.addBookToCart(500, 1);
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

describe("remove book from cart -> Invalid Book ID", () => {
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
    await cartService.addBookToCart(newUser.id, -7);
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

describe("remove book from cart -> Non existing Book ID", () => {
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
    await cartService.removeBookFromCart(newUser.id, 1008);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return cart with no book in it", async () => {
    const response = await cartService.getCartOfUserWithBooks(newUser.id);
    expect(response.books.length >= 1).toBe(false);
  });
});
