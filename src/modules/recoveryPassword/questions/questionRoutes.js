const express = require("express");
const questionController = require("./questionController");

const router = express.Router();

router.get("/random-questions", questionController.getRandomQuestions);


module.exports = router;