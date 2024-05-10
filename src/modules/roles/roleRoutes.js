const express = require("express");
const roleController = require("./roleController");

const router = express.Router();

router.get("/roles", roleController.getRoles);

module.exports = router;