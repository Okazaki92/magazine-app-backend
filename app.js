const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/users", userRouter);
app.get("/", (req, res) => res.send("Welcome"));

module.exports = app;
