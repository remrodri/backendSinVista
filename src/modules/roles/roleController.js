const RoleModel = require("./roleModel");

const roleController = {
  async getRoles(req, res) {
    try {
      const roles = await RoleModel.find({}, "_id roleName");
      return res.status(200).json(roles);
    } catch (error) {
      console.error(`Error al obtener los roles: ${error}`);
      res.status(500).json({ message: `Error interno del servidor` });
    }
  },
  async getRoleName(roleId) {
    try {
      const role = await RoleModel.findById(roleId);
      if (!role) {
        return null;
      }
      return role.roleName;
    } catch (error) {
      console.error(`Error al obtener el nombre del rol: ${error}`);
    }
  }
};
module.exports = roleController;