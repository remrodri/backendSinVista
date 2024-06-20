const TourTypeModel = require("./tourTypeModel");

const tourTypeController = {
  async createTourType(req, res) {
    try {
      const tourType = new TourTypeModel(req.body);
      const savedTourType = await tourType.save();
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

  async getTourTypeById(req, res) {
    try {
      const { id } = req.params;
      const tourType = await TourTypeModel.findById(id).populate(
        "tourPackageId"
      );
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
