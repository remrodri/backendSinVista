const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;
//conexion a la bd
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.error(`Error al conectar a la base de datos: ${error}`);
    process.exit(1); //finaliza
  }
}

module.exports = connectDB;