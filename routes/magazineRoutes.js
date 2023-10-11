const express = require("express");
const { createNewMag } = require("../controllers/magazineController");
const { isAuthenticated, isOwner } = require("../helpers/auth");

const magazineRouter = express.Router();

magazineRouter.post("/create", createNewMag);

module.exports = magazineRouter;
