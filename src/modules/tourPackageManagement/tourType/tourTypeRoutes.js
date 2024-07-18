const express = require("express");
const tourTypeController = require("./tourTypeController");

const router = express.Router();

const route = "/tour-types";

router.post(route, tourTypeController.createTourType);
router.get(route, tourTypeController.getAllTourTypes);
// router.get(`${route}/:id`, tourTypeController.getTourTypeById);
router.get(`${route}/:id`, tourTypeController.getTourPackageTourTypes);
router.patch(`${route}/:id`, tourTypeController.updateTourType);
router.delete(`${route}/:id`, tourTypeController.deleteTourType);

module.exports = router;
