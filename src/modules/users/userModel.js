const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: Boolean, default: true },
  ci: { type: String, required: true },
  password: { type: String, required: true },
  firstLogin: { type: Boolean, required: true },
  createAt: { type: Date, default: () => moment.tz("America/La_Paz").toDate() },
  updateAt: { type: Date, default: () => moment.tz("America/La_Paz").toDate() },
  setQuestionsAnswersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SetQuestionsAnswers",
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
