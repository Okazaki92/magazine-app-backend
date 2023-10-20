const express = require("express");
const {
  createNewMag,
  deleteMag,
  updateMag,
  getAllMag,
  getMagById,
} = require("../controllers/magazineController");
const { isAuthenticated } = require("../helpers/auth");

const magazineRouter = express.Router();

magazineRouter.post("/create", isAuthenticated, createNewMag);
magazineRouter.delete("/delete/:id", isAuthenticated, deleteMag);
magazineRouter.patch("/update/:id", isAuthenticated, updateMag);
magazineRouter.get("/", isAuthenticated, getAllMag);
magazineRouter.get("/:id", isAuthenticated, getMagById);

module.exports = magazineRouter;
