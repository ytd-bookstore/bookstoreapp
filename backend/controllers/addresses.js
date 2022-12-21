const addressService = require("../services/addresses.js");
const { InvalidQueryError } = require("../utils/errors.js");

class AddressController {
  getAddresses = async (req, res, next) => {
    try {
      const { user_id, ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }

      let where = {};
      if (user_id) where = { ...where, user_id };

      const addresses = await addressService.getAddresses(where);
      res.json(addresses);
    } catch (err) {
      next(err);
    }
  };

  getAddressesById = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const address = await addressService.getAddressesById(id);
      res.json(address);
    } catch (err) {
      next(err);
    }
  };
}

const addressController = new AddressController();

module.exports = addressController;
