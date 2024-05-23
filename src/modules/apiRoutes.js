const express = require("express");
const roleRoutes = require("./roles/roleRoutes");
const userRoutes = require("./users/userRoutes");
const recordRoutes = require("./record/recordRoutes");

const router = express.Router();

router.use("/v1", roleRoutes);
router.use("/v1", userRoutes);
router.use("/v1", recordRoutes);

module.exports = router;