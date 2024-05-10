const express = require("express");
const roleRoutes = require("./roles/roleRoutes");

const router = express.Router();

router.use("/v1", roleRoutes);

module.exports = router;