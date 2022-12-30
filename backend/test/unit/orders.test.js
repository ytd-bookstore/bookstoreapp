const userService = require("../../services/users");
const cartService = require("../../services/carts");
const orderService = require("../../services/orders");
const migrate = require("../../database/migration");

describe("checkout", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const cardForm = {
    name: "John",
    surname: "Doe",
    cardNumber: "1111111111111111",
    month: "12",
    cvv: "111",
    year: "2022",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
    await cartService.addBookToCart(newUser.id, 1);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should change order status", async () => {
    await orderService.checkout(newUser.id, cardForm);
    const response = await orderService.getOrderOfUserWithBooks(newUser.id);
    expect(response.length >= 1).toBe(true);
  });
});

describe("get order of user with books", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const cardForm = {
    name: "John",
    surname: "Doe",
    cardNumber: "1111111111111111",
    month: "12",
    cvv: "111",
    year: "2022",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
    await cartService.addBookToCart(newUser.id, 1);
    await orderService.checkout(newUser.id, cardForm);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return orders of user with books", async () => {
    const response = await orderService.getOrderOfUserWithBooks(newUser.id);
    expect(response.length >= 1).toBe(true);
  });
});

describe("update order", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const cardForm = {
    name: "John",
    surname: "Doe",
    cardNumber: "1111111111111111",
    month: "12",
    cvv: "111",
    year: "2022",
  };

  let order;

  const orderForm = {
    status: "Delivered",
  };

  beforeAll(async () => {
    const userResponse = await userService.createUser(newUser);
    newUser.id = userResponse.id;
    await cartService.addBookToCart(newUser.id, 1);
    await orderService.checkout(newUser.id, cardForm);
    const orders = await orderService.getOrderOfUserWithBooks(newUser.id);
    order = orders[0].toJSON();
    orderForm.user_id = newUser.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should change status of the order", async () => {
    const response = await orderService.updateOrder(order.id, orderForm);
    expect(response.status == orderForm.status).toBe(true);
  });
});
