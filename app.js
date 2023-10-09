const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/users", userRouter);
app.get("/", (req, res) => res.send("Welcome"));
app.get("/auth/callback", (req, res) => {
  // Tutaj będziesz obsługiwać odpowiedź od Google
  const code = req.query.code; // Pobierz kod autoryzacyjny
  console.log(code);
  res.status(200).json({ code: code });
  // ...
});
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
