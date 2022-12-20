const express = require("express");

const userService = require("../services/users");

const router = express.Router();

router.get("/", userService.getUsers);
router.get("/:id", userService.getUsersById);
router.get("/:id/address", userService.getUsersByIdWithAddress);

module.exports = router;
