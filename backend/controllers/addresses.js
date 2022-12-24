const addressService = require("../services/addresses.js");
const { InvalidQueryError } = require("../utils/errors.js");
const httpStatusCode = require("../utils/httpStatusCode.js");

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

  createAddress = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const address = await addressService.createAddress(req.body);
      res.status(httpStatusCode.CREATED).json(address);
    } catch (err) {
      next(err);
    }
  };

  updateAddress = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      const address = await addressService.updateAddress(id, req.body);
      res.status(httpStatusCode.CREATED).json(address);
    } catch (err) {
      next(err);
    }
  };

  deleteAddress = async (req, res, next) => {
    try {
      const { ...others } = req.query;
      if (Object.keys(others).length != 0) {
        throw new InvalidQueryError(req.originalUrl);
      }
      const id = req.params.id;
      await addressService.deleteAddress(id);
      res.status(httpStatusCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  };
}

const addressController = new AddressController();

module.exports = addressController;
