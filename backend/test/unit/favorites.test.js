const userService = require("../../services/users");
const favoriteService = require("../../services/favorites");
const migrate = require("../../database/migration");

//CREATE FAVORITE
describe("create a favorite (valid form)", () => {
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

describe("create a favorite (invalid form)", () => {
  const newUser = {
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    passwordHash: "28ghjd2xz5",
    passwordSalt: "68nf9358jd",
    is_admin: "false",
  };

  const favoriteForm = {};

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
    /*TODO:
    expect(createdFavorite.book_id).toBe(favoriteForm.book_id);
    expect(createdFavorite.user_id).toBe(favoriteForm.user_id);*/
  });
});

//GET FAVORITES
describe("get favorites of user with books (existing user id)", () => {
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

describe("get favorites of user with books (non-existing user id)", () => {
  it("should return users favorite books", async () => {
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(12368);
    //TODO: expect(favorites.length >= 1).toBe(true);
  });
});

describe("get favorites of user with books (invalid user id)", () => {
  it("should return users favorite books", async () => {
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(-1);
    //TODO: expect(favorites.length >= 1).toBe(true);
  });
});

//DELETE FAVORITES
describe("delete favorite(existing user, existing book)", () => {
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

describe("delete favorite(existing user, non-existing book)", () => {
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
    favoriteService.deleteFavorite(newUser.id, 12368);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(existing user, invalid book id)", () => {
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
    favoriteService.deleteFavorite(newUser.id, -1);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(non-existing user, existing book)", () => {
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
    favoriteService.deleteFavorite(12368, favoriteForm.book_id);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(non-existing user, non-existing book)", () => {
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
    favoriteService.deleteFavorite(12368, 12368);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(non-existing user, invalid book id)", () => {
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
    favoriteService.deleteFavorite(12368, -1);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(invalid user id, existing book)", () => {
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
    favoriteService.deleteFavorite(-1, favoriteForm.book_id);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(invalid user id, non-existing book)", () => {
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
    favoriteService.deleteFavorite(-1, 12368);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});

describe("delete favorite(invalid user id, invalid book id)", () => {
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
    favoriteService.deleteFavorite(-1, -1);
    const favorites = await favoriteService.getFavoritesOfUserWithBooks(
      newUser.id
    );
    //TODO: expect(favorites.length >= 1).toBe(false);
  });
});
