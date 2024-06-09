const { hashPassword } = require("../../config/bcryptUtils");
const UserModel = require("./userModel");
const bcrypt = require("bcrypt");
const roleController = require("../roles/roleController");
const jwt = require("jsonwebtoken");
const RecordController = require("../record/recordController");
const QuestionModel = require("../recoveryPassword/questions/questionModel");
const SetQuestionsAnswersModel = require("../recoveryPassword/setQuestionsAnswers/setQuestionAnswerModel");
const { default: mongoose } = require("mongoose");
const answerController = require("../recoveryPassword/answers/answerController");
const AnswerModel = require("../recoveryPassword/answers/answerModel");

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
        firstLogin: true,
      });
      const savedUser = await newUser.save();

      // Selecciona 3 preguntas aleatorias
      const questions = await QuestionModel.aggregate([
        { $sample: { size: 3 } },
      ]);
      // console.log('questions::: ', questions);
      // const emptyAnswers = createEmptyAnswers();
      const questionsAnswers = await Promise.all(
        questions.map(async (question) => {
          const newAnswer = new AnswerModel({ content: "" });
          const savedAnswer = await newAnswer.save();
          return { questionId: question._id, answerId: savedAnswer._id };
        })
      );

      // Crea un nuevo set de preguntas y respuestas vacío
      const newSetQuestionAnswer = new SetQuestionsAnswersModel({
        userId: savedUser._id,
        questionsAnswers: questionsAnswers,
      });
      await newSetQuestionAnswer.save();
      console.log("newSetQuestionAnswer::: ", newSetQuestionAnswer);

      savedUser.setQuestionsAnswersId = newSetQuestionAnswer._id;
      await savedUser.save();
      res.status(201).json({
        message: `usuario registrado con exito`,
        userId: savedUser._id,
      });
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
          firstLogin: user.firstLogin,
          roleName,
        },
        "mipasswordsecreto1",
        { expiresIn: "30d" }
      );
      await RecordController.recordLogin(user._id);
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
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const deleteUser = await UserModel.findByIdAndDelete(userId);
      if (!deleteUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario eliminado con exito" });
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  async logout(req, res) {
    console.log("req::: ", req.body);
    try {
      await RecordController.recordLogout(req.body.userId);
      res.status(200).json({ message: "logout exitoso" });
    } catch (error) {
      console.error("Error al cerrar sesion: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await UserModel.findById(userId).populate(
        "setQuestionsAnswersId"
      );
      if (!user) {
        return res.status(404).json({ message: "user no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error al obtener el user: ${error}`);
      res.status(500).json({ message: `Error interno del servidor` });
    }
  },
};

module.exports = userController;
