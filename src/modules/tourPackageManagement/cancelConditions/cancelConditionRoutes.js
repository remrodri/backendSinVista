const express = require("express");
const cancelConditionController = require("./cancelConditionController");
const router = express.Router();

const route = "/cancel-conditions";

router.get(route, cancelConditionController.getAllCancelConditions);
router.post(route, cancelConditionController.createCancelConditions);
router.get(`${route}/:id`, cancelConditionController.getCancelConditionsById);
router.patch(`${route}/:id`, cancelConditionController.updateCancelConditions);

module.exports = router;
