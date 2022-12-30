const userService = require("../../services/users");
const cartService = require("../../services/carts");
const migrate = require("../../database/migration");

describe("add book to cart", () => {
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

describe("get cart of user with books", () => {
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

describe("remove book from cart", () => {
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
