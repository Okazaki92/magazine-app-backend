require("dotenv").config();
const { error } = require("console");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB, {
  dbName: "Magazine-App",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongo"));

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome"));

app.listen(3000, () => console.log("Server run at http://localhost:3000"));
