require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./src/config/database");
const apiRoutes = require("./src/modules/apiRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

connectDB();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const corsOptions = {
  // origin: "https://icy-cliff-0dbe5050f.5.azurestaticapps.net",
  //origin: "http://localhost:5173",
  // origin: "https://gentle-bush-0b604f90f.5.azurestaticapps.net",
  origin:"https://picot-frontend.vercel.app",
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

var app = express();

app.use(cors(corsOptions));
// app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRoutes);

module.exports = app;
