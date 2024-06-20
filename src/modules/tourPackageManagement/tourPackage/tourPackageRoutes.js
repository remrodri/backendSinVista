const express = require("express");
const tourPackageController = require("./tourPackageController");
const router = express.Router();

const route = "/tour-packages";

router.get(route, tourPackageController.getAllTourPackages);
router.get(`${route}/:id`, tourPackageController.getTourPackageById);
router.post(route, tourPackageController.createTourPackage);
router.patch(`${route}/:id`, tourPackageController.updateTourPackage);

module.exports = router;
