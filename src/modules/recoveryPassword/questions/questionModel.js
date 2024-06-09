const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  content: { type: String, required: true, unique: true },
});

const QuestionModel = mongoose.model("Question", questionSchema);

module.exports = QuestionModel;
