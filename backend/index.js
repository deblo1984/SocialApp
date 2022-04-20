const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

//mongodb connection handshake
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) throw err;
    console.log("Successfully connected");
  }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//api routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

//server start at port 5000
app.listen(5000, () => {
  console.log("backend server is running!");
});
