const express = require("express");
const tourTypeController = require("./tourTypeController");

const router = express.Router();

const route = "/tour-types";

router.post(route, tourTypeController.createTourType);
router.get(route, tourTypeController.getAllTourTypes);
router.get(`${router}/:id`, tourTypeController.getTourTypeById);
router.patch(`${router}/:id`, tourTypeController.updateTourType);
router.delete(`${router}/:id`, tourTypeController.deleteTourType);

module.exports = router;
