const express = require("express");

const controller = require("../controllers/users");

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUsersById);
router.get("/:id/address", controller.getUsersByIdWithAddress);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.put("/:id/address", controller.updateUserWithAddress);
router.delete("/:id", controller.deleteUser);
router.post("/auth/register/", controller.register);

module.exports = router;
