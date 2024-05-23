const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  eventType: { type: String, enum: ["login", "logout"], require: true },
  createAt: { type: Date, default: Date.now },
});

const RecordModel = mongoose.model("Record", recordSchema);
module.exports = RecordModel;
