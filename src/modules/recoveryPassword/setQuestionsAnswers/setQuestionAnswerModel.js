const mongoose = require("mongoose");

const setQuestionsAnswerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    required: true,
    unique: true,
  },
  questionsAnswers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
      },
    }
  ],
},{collection:"setQuestionsAnswers"});

const SetQuestionsAnswersModel = mongoose.model(
  "SetQuestionsAnswers",
  setQuestionsAnswerSchema
);

module.exports = SetQuestionsAnswersModel;
