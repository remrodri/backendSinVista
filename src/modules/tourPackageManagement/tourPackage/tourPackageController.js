const TourPackageModel = require("./tourPackageModel");

const tourPackageController = {
  async getAllTourPackages(req, res) {
    try {
      const tourPackages = await TourPackageModel.find().populate("tourTypes");
      res.status(200).json(tourPackages);
    } catch (error) {
      console.error("Error al obtner los paquetes turisticos: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getTourPackageById(req, res) {
    const { tourPackageId } = req.params;
    try {
      const tourPackage = await TourPackageModel.findById(
        tourPackageId
      ).populate("tourTypes");
      if (!tourPackage) {
        return res.status(404).json({ message: "tourPackage no encontrado" });
      }
      res.status(200).json(tourPackage);
    } catch (error) {
      console.error("Error al obtener el paquete turistico: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async createTourPackage(req, res) {
    try {
      const newTourPackage = new TourPackageModel(req.body);
      const savedTourPackage = await newTourPackage.save();
      res.status(201).json(savedTourPackage);
    } catch (error) {
      console.error("Error al crear el paquete turistico: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async updateTourPackage(req, res) {
    const { tourPackageId } = req.params;
    const updateData = req.body;
    try {
      const updatedTourPackage = await TourPackageModel.findByIdAndUpdate(
        tourPackageId,
        updateData,
        { new: true }
      ).populate("tourTypes");
      if (!updatedTourPackage) {
        return res.status(404).json({ message: "tourPackage no encontrado" });
      }
      res.status(200).json(updatedTourPackage);
    } catch (error) {
      console.error("Error al actualizar el tourPackage: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async deleteTourPackage(req, res) {
    const { tourPackageId } = req.params;
    try {
      const deletedTourPackage = await TourPackageModel.findByIdAndDelete(
        tourPackageId
      );
      if (!deletedTourPackage) {
        return res.status(404).json({ message: "tourPackage no encontrado" });
      }
      res.status(200).json({ message: "tourPackage eliminado con exito" });
    } catch (error) {
      console.error("Error al eliminar el tourpackage");
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
module.exports = tourPackageController;
