const express = require("express");
const tourPackageController = require("./tourPackageController");

const router = express.Router();

router.get("/tourPackages", tourPackageController.getAllTourPackages);
router.post("/tourPackages", tourPackageController.createTourPackage);

module.exports = router;
