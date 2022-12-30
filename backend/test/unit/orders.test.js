const userService = require("../../services/users");
const cartService = require("../../services/carts");
const orderService = require("../../services/orders");
const migrate = require("../../database/migration");

//CHECKOUT
describe("checkout (existing user, valid card)", () => {
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

describe("checkout (existing user, invalid card)", () => {
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
    cardNumber: "11111",
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
    //TODO: expect(response.length >= 1).toBe(true);
  });
});

describe("checkout (non-existing user, valid card)", () => {
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
    await orderService.checkout(12368, cardForm);
    const response = await orderService.getOrderOfUserWithBooks(newUser.id);
    //TODO: expect(response.length >= 1).toBe(true);
  });
});

describe("checkout (non-existing user, invalid card)", () => {
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
    cardNumber: "1111",
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
    await orderService.checkout(12368, cardForm);
    const response = await orderService.getOrderOfUserWithBooks(newUser.id);
    //TODO: expect(response.length >= 1).toBe(true);
  });
});

describe("checkout (invalid user, valid card)", () => {
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
    await orderService.checkout(-1, cardForm);
    const response = await orderService.getOrderOfUserWithBooks(newUser.id);
    //TODO: expect(response.length >= 1).toBe(true);
  });
});

describe("checkout (invalid user, invalid card)", () => {
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
    cardNumber: "111111",
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
    await orderService.checkout(-1, cardForm);
    const response = await orderService.getOrderOfUserWithBooks(newUser.id);
    //TODO: expect(response.length >= 1).toBe(true);
  });
});

//GET ORDER
describe("get order of user with books(existing user)", () => {
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

describe("get order of user with books(non-existing user)", () => {
  it("should return orders of user with books", async () => {
    const response = await orderService.getOrderOfUserWithBooks(12368);
    //TODO: expect(response.length >= 1).toBe(false);
  });
});

describe("get order of user with books(invalid user id)", () => {
  it("should return orders of user with books", async () => {
    const response = await orderService.getOrderOfUserWithBooks(-2);
    //TODO: expect(response.length >= 1).toBe(false);
  });
});

//UPDATE ORDER
describe("update order(existing order, valid form)", () => {
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

describe("update order(existing order, invalid form)", () => {
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
    status: "Status",
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
    //TODO: expect(response.status == orderForm.status).toBe(true);
  });
});

describe("update order(non-existing order, valid form)", () => {
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
    const response = await orderService.updateOrder(12368, orderForm);
    //TODO: expect(response.status == orderForm.status).toBe(true);
  });
});

describe("update order(non-existing order, invalid form)", () => {
  const orderForm = {
    status: "Status",
  };
  it("should change status of the order", async () => {
    const response = await orderService.updateOrder(12368, orderForm);
    //TODO: expect(response.status == orderForm.status).toBe(true);
  });
});

describe("update order(invalid order id, valid form)", () => {
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
    const response = await orderService.updateOrder(-1, orderForm);
    //TODO: expect(response.status == orderForm.status).toBe(true);
  });
});

describe("update order(invalid order id, invalid form)", () => {
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
    status: "Status",
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
    const response = await orderService.updateOrder(-1, orderForm);
    //TODO: expect(response.status == orderForm.status).toBe(true);
  });
});
