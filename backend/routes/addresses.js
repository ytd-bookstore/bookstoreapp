const express = require("express");

const controller = require("../controllers/addresses");

const router = express.Router();

router.get("/", controller.getAddresses);
router.get("/:id", controller.getAddressesById);
router.post("/", controller.createAddress);
router.put("/:id", controller.updateAddress);
router.delete("/:id", controller.deleteAddress);

module.exports = router;
