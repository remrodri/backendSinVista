const mongoose = require("mongoose");
const moment = require("moment-timezone");

const itinerarySchema = new mongoose.Schema({
  hour: { type: String, required: true },
  activity: { type: String, required: true },
});

const tourTypeSchema = new mongoose.Schema(
  {
    tourPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    meals: {
      breakfast: { type: Boolean, default: false },
      lunch: { type: Boolean, default: false },
      dinner: { type: Boolean, default: false },
    },
    itinerary: [itinerarySchema],
    attractions: { type: [String], required: true },
    available: { type: Boolean, default: false },
    duration: { type: Number, required: true },
    // availableDates: [Date]
  },
  // { collection: "tourTypes" },
  { timestamps: true, collection: "tourTypes" }
);

// tourTypeSchema.pre("save", function (next) {
//   const currentDate = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "America/La_Paz" })
//   );
//   this.updatedAt = currentDate;
//   if (!this.createdAt) {
//     this.createdAt = currentDate;
//   }
//   next();
// });

const TourTypeModel = mongoose.model("TourType", tourTypeSchema);

module.exports = TourTypeModel;
