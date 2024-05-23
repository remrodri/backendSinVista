const express = require("express");
const RecordController = require("./recordController");

const router = express.Router();

router.get("/records", RecordController.getRecords)

module.exports = router;

