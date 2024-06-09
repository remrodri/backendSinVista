const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content: { type: String,required:false, },
});

const AnswerModel = mongoose.model("Answer", answerSchema);

module.exports = AnswerModel;
