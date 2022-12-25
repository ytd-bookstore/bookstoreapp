const Book = require("../models/Book");
const Favorite = require("../models/Favorite");
const Genre = require("../models/Genre");
const { NotFoundError, APIError, BadRequestError } = require("../utils/errors");

class FavoriteService {
  getFavorites = async () => {
    try {
      const favorites = await Favorite.findAll();
      return favorites;
    } catch (err) {
      throw new APIError();
    }
  };

  getFavoritesOfUserWithBooks = async (user_id) => {
    try {
      const favorites = await Favorite.findAll({
        where: { user_id },
        include: {
          model: Book,
          as: "Book",
          include: {
            model: Genre,
            through: {
              attributes: [],
            },
            as: "genres",
          },
        },
      });
      return favorites;
    } catch (err) {
      console.log(err);
      throw new APIError();
    }
  };

  createFavorite = async (form) => {
    try {
      const favorite = await Favorite.create(form);
      return favorite;
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError" ||
        err instanceof BadRequestError
      ) {
        throw err;
      }
      throw err;
    }
  };

  updateFavorite = async (user_id, book_id, form) => {
    try {
      let favorite = await Favorite.findOne({ where: { user_id, book_id } });
      if (!favorite) throw new BadRequestError();
      favorite = await favorite.update(form);
      return favorite;
    } catch (err) {
      if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError" ||
        err instanceof BadRequestError
      ) {
        throw err;
      }
      throw new APIError();
    }
  };

  deleteFavorite = async (user_id, book_id) => {
    try {
      let favorite = await Favorite.findOne({ where: { user_id, book_id } });
      if (!favorite) throw new BadRequestError();
      await favorite.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };
}

const favoriteService = new FavoriteService();
module.exports = favoriteService;
