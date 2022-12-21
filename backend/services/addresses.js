const Address = require("../models/Address");
const { NotFoundError, APIError } = require("../utils/errors");

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
}

const addressService = new AddressService();
module.exports = addressService;
