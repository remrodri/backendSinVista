const express = require("express");
const setQuestionsAnswersController = require("./setQuestionsAnswersController");

const router = express.Router();

router.post(
  "/set-question-answer",
  setQuestionsAnswersController.createSetQuestionAnswer
);
router.get(
  "/set-question-answer/:userId",
  setQuestionsAnswersController.getSetQuestionAnswerById
);
router.patch(
  "/set-question-answer/:setQuestionsAnswersId",
  setQuestionsAnswersController.updateSetQuestionAnswer
);

router.post('/random-question-answer', setQuestionsAnswersController.getRandomQuestionAnswer);

module.exports = router;
