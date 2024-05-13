const bycript = require("bcrypt");

const satlRounds = 10;

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bycript.hash(password, satlRounds);
    console.log('hashedPassword::: ', hashedPassword);
  } catch (error) {
    throw new Error(`Error al hashear password: ${error}`);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error(`Error al comparar los passwords: ${error}`);
  }
};