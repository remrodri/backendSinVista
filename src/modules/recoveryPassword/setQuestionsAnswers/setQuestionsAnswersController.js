const UserModel = require("../../users/userModel");
const AnswerModel = require("../answers/answerModel");
const SetQuestionsAnswersModel = require("./setQuestionAnswerModel");
const jwt = require("jsonwebtoken");

const setQuestionAnswerController = {
  async createSetQuestionAnswer(req, res) {
    const { userId, questionsAnswers } = req.body;
    try {
      // Check if user already has a set of questions
      const existingSet = await SetQuestionsAnswersModel.findOne({ userId });
      if (existingSet) {
        return res
          .status(400)
          .json({ message: "User already has a set of questions." });
      }

      // Create new answers with empty content
      const emptyAnswers = await Promise.all(
        questionsAnswers.map(async (qa) => {
          const newAnswer = new AnswerModel({ content: "" });
          const savedAnswer = await newAnswer.save();
          return { questionId: qa.questionId, answerId: savedAnswer._id };
        })
      );

      const newSetQuestionAnswer = new SetQuestionsAnswersModel({
        userId,
        questionsAnswers: emptyAnswers,
      });

      const savedSetQuestionAnswer = await newSetQuestionAnswer.save();
      res.status(201).json(savedSetQuestionAnswer);
    } catch (error) {
      console.error("Error creating set of questions and answers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getSetQuestionAnswerById(req, res) {
    const { userId } = req.params;
    try {
      const setQuestionAnswer = await SetQuestionsAnswersModel.findOne({
        userId,
      })
        .populate("questionsAnswers.questionId")
        .populate("questionsAnswers.answerId");
      if (!setQuestionAnswer) {
        return res
          .status(404)
          .json({ message: "Set of questions and answers not found" });
      }
      res.status(200).json(setQuestionAnswer);
    } catch (error) {
      console.error("Error fetching set of questions and answers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateSetQuestionAnswer(req, res) {
    const { setQuestionsAnswersId } = req.params;
    // console.log("req.body::: ", req.body);
    const { answers } = req.body; // `answers` should be an array of objects { questionId, content }

    try {
      // Fetch the setQuestionsAnswers document by its ID
      const setQuestionsAnswers = await SetQuestionsAnswersModel.findById(
        setQuestionsAnswersId
      );

      if (!setQuestionsAnswers) {
        return res
          .status(404)
          .json({ message: "Set of questions and answers not found" });
      }

      // Iterate over the answers array and update the corresponding answers
      const updatedAnswers = await Promise.all(
        answers.map(async (answer) => {
          const { questionId, content } = answer;

          // Find the corresponding questionAnswer in the setQuestionsAnswers document
          const questionAnswer = setQuestionsAnswers.questionsAnswers.find(
            (qa) => qa.questionId.toString() === questionId
          );

          if (!questionAnswer) {
            throw new Error(
              `Question ID ${questionId} not found in the setQuestionsAnswers document`
            );
          }

          // Update the content of the corresponding answer
          const updatedAnswer = await AnswerModel.findByIdAndUpdate(
            questionAnswer.answerId,
            { content },
            { new: true, runValidators: true }
          );

          if (!updatedAnswer) {
            throw new Error(`Answer ID ${questionAnswer.answerId} not found`);
          }

          return updatedAnswer;
        })
      );

      res
        .status(200)
        .json({ message: "Answers updated successfully", updatedAnswers });
    } catch (error) {
      console.error(`Error updating answers: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getRandomQuestionAnswer(req, res) {
    try {
      // console.log("req.body::: ", req.body);
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const setQuestionsAnswers = await SetQuestionsAnswersModel.findOne({
        userId: user._id,
      })
        .populate("questionsAnswers.questionId")
        .populate("questionsAnswers.answerId");
      if (!setQuestionsAnswers) {
        return res
          .status(404)
          .json({ message: "SetQuestionsAnswers no encontrado" });
      }
      const randomIndex = Math.floor(
        Math.random() * setQuestionsAnswers.questionsAnswers.length
      );
      const randomQuestionAnswer =
        setQuestionsAnswers.questionsAnswers[randomIndex];

      const token = jwt.sign(
        {
          questionAnswer: randomQuestionAnswer,
          userId: user._id,
        },
        "mipasswordsecreto1",
        { expiresIn: "30d" }
      );

      res
        .status(200)
        // .json({ questionAnswer: randomQuestionAnswer, userId: user._id });
        .json({ token });
    } catch (error) {
      console.error(
        "Error al obtener una pregunta y respuesta aleatoria: ",
        error
      );
    }
  },
};

module.exports = setQuestionAnswerController;
