const userService = require("../../services/users");
const favoriteService = require("../../services/favorites");
const migrate = require("../../database/migration");

describe("create a favorite", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const favoriteForm = {
    book_id: 1,
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
    favoriteForm.user_id = newUser.id;
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should create a new favorite", async () => {
    const createdFavorite = await (
      await favoriteService.createFavorite(favoriteForm)
    ).toJSON();
    expect(createdFavorite.book_id).toBe(favoriteForm.book_id);
    expect(createdFavorite.user_id).toBe(favoriteForm.user_id);
  });
});

describe("get favorites of user with books", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const favoriteForm = {
    book_id: 1,
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
    favoriteForm.user_id = newUser.id;
    await favoriteService.createFavorite(favoriteForm);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return users favorite books", async () => {
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    expect(favorites.length >= 1).toBe(true);
  });
});

describe("delete favorite", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const favoriteForm = {
    book_id: 1,
  };

  beforeAll(async () => {
    const response = await userService.createUser(newUser);
    newUser.id = response.id;
    favoriteForm.user_id = newUser.id;
    await favoriteService.createFavorite(favoriteForm);
  });
  afterAll(async () => {
    await userService.deleteUser(newUser.id);
  });
  it("should return users favorite books", async () => {
    favoriteService.deleteFavorite(newUser.id, favoriteForm.book_id);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    expect(favorites.length >= 1).toBe(false);
  });
});
