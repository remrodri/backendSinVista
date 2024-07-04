const mongoose = require("mongoose");

const cancelConditionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    daysBeforeCancel: { type: Number, required: true },
    retainedPercentage: { type: Number, required: true },
    cancelDescription: { type: String, required:true },
  },
  {
    timestamps: true,
    collection: "cancelConditions",
  }
);

const CancelConditionsModel = mongoose.model(
  "CancelConditions",
  cancelConditionSchema
);

module.exports = CancelConditionsModel;
