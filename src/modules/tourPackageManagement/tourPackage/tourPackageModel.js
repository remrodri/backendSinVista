const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    destination: { type: String, required: true },
    tourTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "TourType" }],
    // duration: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "tourPackages",
  }
);

const TourPackageModel = mongoose.model("TourPackage", tourPackageSchema);

module.exports = TourPackageModel;
