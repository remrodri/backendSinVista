const QuestionModel = require("./questionModel");

const questionController = {
  async getAllQuestions(req, res) {
    try {
      const questions = await QuestionModel.find();
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error al obtener las preguntas: ", error);
      res.status(500).json({ message: "Error interno del servidor " });
    }
  },
  async getRandomQuestions(req, res) {
    const count = 3;
    try {
      const questions = await QuestionModel.aggregate([
        { $sample: { size: count } },
      ]);
      console.log("questions::: ", questions);
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error al obtener preguntas aleatorias: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },

};

module.exports = questionController;
