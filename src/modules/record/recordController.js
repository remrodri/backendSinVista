const RecordModel = require("./recordModel");
const moment = require("moment-timezone");

const RecordController = {
  async recordLogin(userId) {
    try {
      const newRecord = new RecordModel({
        userId: userId,
        eventType: "login",
      });
      await newRecord.save();
      // console.log("login registrado")
    } catch (error) {
      console.error("Error al registrar inicio de sesion: ", error);
    }
  },
  async recordLogout(userId) {
    try {
      const newRecord = new RecordModel({
        userId: userId,
        eventType: "logout",
      });
      await newRecord.save();
    } catch (error) {
      console.error("Error al registrar cierre de sesion", error);
    }
  },
  async getRecords(req, res) {
    try {
      const records = await RecordModel.find().sort({ createAt: "desc" });
      const recordsWithBoliviaTime = records.map((record) => ({
        ...record.toObject(),
        createAt: moment
          .tz(record.createAt, "America/La_Paz")
          .format(),
      }));
      res.status(200).json(recordsWithBoliviaTime);
    } catch (error) {
      console.error("Error obteniendo los registros de Logs: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};

module.exports = RecordController;
