const express = require("express");
const roleRoutes = require("./roles/roleRoutes");
const userRoutes = require("./users/userRoutes");
const recordRoutes = require("./record/recordRoutes");
const questionRoutes = require("./recoveryPassword/questions/questionRoutes");
const answersRoutes = require("./recoveryPassword/answers/answerRoutes");
const setQuestionsAnswers = require("./recoveryPassword/setQuestionsAnswers/setQuestionsAnswersRoutes");

const router = express.Router();

router.use("/v1", roleRoutes);
router.use("/v1", userRoutes);
router.use("/v1", recordRoutes);
router.use("/v1", questionRoutes);
router.use("/v1", answersRoutes);
router.use("/v1", setQuestionsAnswers);

module.exports = router;
