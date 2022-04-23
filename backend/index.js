const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

dotenv.config();

//mongodb connection handshake
connectDB();

//middleware
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}

//api routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

//server start at port FROM .env PORT=
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
