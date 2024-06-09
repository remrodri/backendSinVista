const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);
router.post("/register", userController.registerUser);
router.post("/logout", userController.logout);
router.post("/login", userController.login);
router.patch("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

module.exports = router;
