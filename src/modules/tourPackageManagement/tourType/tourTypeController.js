const TourPackageModel = require("../tourPackage/tourPackageModel");
const TourTypeModel = require("./tourTypeModel");

const tourTypeController = {
  async createTourType(req, res) {
    console.log("req::: ", req.body);
    try {
      const tourType = new TourTypeModel(req.body);
      const savedTourType = await tourType.save();
      //actualiza tourTypes en tourPackage
      const tourPackageId = savedTourType.tourPackageId;
      await TourPackageModel.findByIdAndUpdate(
        tourPackageId,
        { $push: { tourTypes: savedTourType._id } },
        { new: true }
      );
      res.status(201).json(savedTourType);
    } catch (error) {
      console.error("Error al crear el tourType: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getAllTourTypes(req, res) {
    try {
      const tourTypes = await TourTypeModel.find().populate("tourPackageId");
      res.status(200).json(tourTypes);
    } catch (error) {
      console.error("Error al obtener los tourTypes: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getTourPackageTourTypes(req, res) {
    const { id } = req.params;
    try {
      const tourPackage = await TourPackageModel.findById(id).populate(
        "tourTypes"
      );
      if (!tourPackage) {
        return res.status(404).json({ message: "tourPackage no encontrado" });
      }
      res.status(200).json(tourPackage.tourTypes);
    } catch (error) {
      console.error("Error al obtener el tourPackage: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getTourTypeById(req, res) {
    const { id } = req.params;
    try {
      // const tourType = await TourTypeModel.findById(id).populate(
      //   "tourPackageId"
      // );
      const tourType = await TourTypeModel.findById(id);
      if (!tourType) {
        return res
          .status(404)
          .json({ message: "El tourType no se encontro: ", error });
      }
      res.status(200).json(tourType);
    } catch (error) {
      console.error("Error al obtener el tipo de tour: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async updateTourType(req, res) {
    try {
      const { id } = req.params;
      console.log("id::: ", id);
      console.log("req.body::: ", req.body);
      const updatedTourType = await TourTypeModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      ).populate("tourPackageId");
      if (!updatedTourType) {
        return res.status(404).json({ message: "tourtype no encontrado" });
      }
      res.status(200).json(updatedTourType);
    } catch (error) {
      console.error("Error al actualizar el tourType: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async deleteTourType(req, res) {
    try {
      const { id } = req.params;
      const deletedToutType = await TourTypeModel.findByIdAndDelete(id);
      if (!deletedToutType) {
        return res.status(404).json({ message: "tourType no encontrado" });
      }
      res.status(200).json({ message: "tourType eliminado con exito" });
    } catch (error) {
      console.error("Error al eliminar el tipo de tour: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
module.exports = tourTypeController;
