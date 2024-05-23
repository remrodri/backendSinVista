const { hashPassword } = require("../../config/bcryptUtils");
const UserModel = require("./userModel");
const bcrypt = require("bcrypt");
const roleController = require("../roles/roleController");
const jwt = require("jsonwebtoken");

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
  async registerUser(req, res) {
    try {
      const hashedPassword = await hashPassword("password");
      console.log("hashedPassword::: ", hashedPassword);
      const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId,
        phone: req.body.phone,
        ci: req.body.ci,
      });
      await newUser.save();
      res.status(201).json({ message: `usuario registrado con exito` });
    } catch (error) {
      console.error(`Error al registrar usuario: ${error}`);
      res.status(500).json({ message: `Error interno del servidor` });
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return (
          res
            // .status(401)
            .send({ message: "credenciales incorrectas" })
        );
      }
      const roleName = await roleController.getRoleName(user.roleId);
      if (!roleName) {
        return res.status(404).send({ message: `Rol de usario no encontrado` });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          status: user.status,
          roleName,
        },
        "mipasswordsecreto1",
        { expiresIn: "30d" }
      );
      res.json({ token });
    } catch (error) {
      console.error(`Error al iniciar sesion: ${error}`);
      res.status(500).json({ message: `Error interno del servidor` });
    }
  },
  async updateUser(req, res) {
    const { userId } = req.params;
    const updateData = req.body;
    try {
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res
        .status(200)
        .json({ message: "Usuario actualizado con exito", user: updatedUser });
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

};

module.exports = userController;
