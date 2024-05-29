const mongoose = require("mongoose");
const moment = require("moment-timezone");

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  eventType: { type: String, enum: ["login", "logout"], require: true },
  createAt: { type: Date, default: () => moment.tz("America/La_Paz").toDate() },
});

const RecordModel = mongoose.model("Record", recordSchema);
module.exports = RecordModel;
