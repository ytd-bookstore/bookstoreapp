const express = require("express");

const controller = require("../controllers/auth");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/adminlogin", controller.adminlogin);

module.exports = router;
