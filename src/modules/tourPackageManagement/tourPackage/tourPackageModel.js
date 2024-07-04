const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    destination: { type: String, required: true },
    tourTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "TourType" }],
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "unavailable",
    },
    type: {
      type: String,
      enum: ["international", "national"],
      required: true,
    },
    cancelConditionsId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "CancelConditions",
    },
    // duration: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "tourPackages",
  }
);

const TourPackageModel = mongoose.model("TourPackage", tourPackageSchema);

module.exports = TourPackageModel;
