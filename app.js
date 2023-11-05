const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const magazineRouter = require("./routes/magazineRoutes");
const productRouter = require("./routes/productRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({ origin: "https://magazine-app.vercel.app", credentials: true })
);
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/magazines", magazineRouter);
app.use("/magazines", productRouter);
app.get("/", (req, res) => res.send("Welcome"));
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
