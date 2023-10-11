const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const magazineRouter = require("./routes/magazineRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/magazines", magazineRouter);
app.get("/", (req, res) => res.send("Welcome"));
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
