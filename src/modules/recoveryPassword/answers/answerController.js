const AnswerModel = require("./answerModel");

const answerController = {
  async createAnswer(req, res) {
    try {
      const newAnswer = new AnswerModel({
        content: req.body.content,
      });
      // console.log("newAnswer::: ", newAnswer);
      const savedAnswer = await newAnswer.save();
      // console.log("savedAnswer::: ", savedAnswer);
      res.status(200).json({ answerId: savedAnswer._id });
    } catch (error) {
      console.error("Error al crear answer: ", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
module.exports = answerController;
