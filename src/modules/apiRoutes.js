const express = require("express");
const roleRoutes = require("./roles/roleRoutes");
const userRoutes = require("./users/userRoutes");

const router = express.Router();

router.use("/v1", roleRoutes);
router.use("/v1", userRoutes);

module.exports = router;