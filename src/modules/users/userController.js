const UserModel = require("./userModel");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(`Error al obtener los usuarios: ${error}`);
      res.status(500).json({ message: `Error interno del servidor` });
    }
  },
}

module.exports = userController;