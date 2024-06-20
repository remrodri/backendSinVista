const mongoose = require("mongoose");
const moment = require("moment-timezone");

const mealSchema = new mongoose.Schema({
  breakfast: { type: Boolean, default: false },
  lunch: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
});

const tourPackageSchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: Number, required: true },
    accomodationType: { type: String,  },
    services: { type: [String], required: true },
    meals: { type: mealSchema, required: true },
    // mealAdditionaInfo: { type: String, required: "" },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    attractions: { type: [String], required: true },
    price: { type: Number, required: true },
    createAt: {
      type: Date,
      default: () => moment.tz("America/La_Paz").toDate(),
    },
    updatedAt: {
      type: Date,
      default: () => moment.tz("America/La_Paz").toDate(),
    },
  },
  { collection: "tourPackages" }
);

const TourPackageModel = mongoose.model("TourPackage", tourPackageSchema);

module.exports = TourPackageModel;
