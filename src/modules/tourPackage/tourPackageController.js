const TourPackageModel = require("./tourPackageModel");

const tourPackageController = {
  async createTourPackage(req, res) {
    try {
      const newPackage = new TourPackageModel(req.body);
      const savedPackage = await newPackage.save();
      res.status(201).json(savedPackage);
    } catch (error) {
      console.error("Error creando tourPackage: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async getAllTourPackages(req, res) {
    try {
      const packages = await TourPackageModel.find();
      res.status(200).json(packages);
    } catch (error) {
      console.error("Error obteniendo tourPackages:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
module.exports = tourPackageController;
