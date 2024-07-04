const CancelConditionsModel = require("./CancelConditionModel");


const cancelConditionsController = {
  async getAllCancelConditions(req, res) {
    try {
      const conditions = await CancelConditionsModel.find();
      res.status(200).json(conditions);
    } catch (error) {
      console.error("Error al obtener todas las condiciones: ", error);
    }
  },

  async getCancelConditionsById(req, res) {
    const { id } = req.params;
    try {
      const condition = await CancelConditionsModel.findById(id);
      if (!condition) {
        res.status(404).json({ message: "Condition no encontrada" });
      }
      res.status(200).json(condition);
    } catch (error) {
      console.error("Error al obtener las condiciones");
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async createCancelConditions(req, res) {
    try {
      const newConditions = new CancelConditionsModel(req.body);
      const savedCondition = await newConditions.save();
      res.status(201).json(savedCondition);
    } catch (error) {
      console.error("Error al crear las condiciones: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async updateCancelConditions(req, res) {
    const { id } = req.params;
    try {
      const updatedCondition = await CancelConditionsModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!updatedCondition) {
        res.status(404).json({ message: "Condition no encontrada" });
      }
      res.status(200).json(updatedCondition);
    } catch (error) {
      console.error("Error al actualizar las condiciones: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

module.exports = cancelConditionsController;
