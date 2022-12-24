const Address = require("../models/Address");
const User = require("../models/User");
const { NotFoundError, APIError, BadRequestError } = require("../utils/errors");

class AddressService {
  getAddresses = async (where) => {
    try {
      const addresses = await Address.findAll({ where });
      return addresses;
    } catch (err) {
      throw new APIError();
    }
  };

  getAddressesById = async (id) => {
    try {
      const address = await Address.findByPk(id);
      if (!address) throw new NotFoundError();
      return address;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new APIError();
    }
  };

  createAddress = async (form) => {
    try {
      let user_id = form.user_id;
      let addresses = await Address.findAll({ where: { user_id } });
      if (addresses[0]) throw new BadRequestError();
      const address = await Address.create(form);
      return address;
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

  updateAddress = async (id, form) => {
    try {
      let address = await Address.findByPk(id);
      if (!address) throw new BadRequestError();
      address = await address.update(form);
      return address;
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

  deleteAddress = async (id) => {
    try {
      let address = await Address.findByPk(id);
      if (!address) throw new BadRequestError();
      await address.destroy();
      return;
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }
      throw new APIError();
    }
  };
}

const addressService = new AddressService();
module.exports = addressService;
