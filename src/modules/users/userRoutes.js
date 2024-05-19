const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/register", userController.registerUser);

router.post("/login", userController.login);
module.exports = router;