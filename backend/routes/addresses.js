const express = require("express");

const controller = require("../controllers/addresses");

const router = express.Router();

router.get("/", controller.getAddresses);
router.get("/:id", controller.getAddressesById);

module.exports = router;
