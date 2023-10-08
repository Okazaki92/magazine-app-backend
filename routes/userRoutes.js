const express = require("express");
const {
  register,
  login,
  getUser,
  logout,
  sendVerifyToken,
  verifyUserToken,
} = require("../controllers/userControllers");
const { isAuthenticated, isOwner } = require("../helpers/auth");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/current/:id", isAuthenticated, isOwner, getUser);
userRouter.get("/logout/:id", isAuthenticated, isOwner, logout);
userRouter.get("/verify", sendVerifyToken);
userRouter.get("verify/:verificationToken", verifyUserToken);

module.exports = userRouter;
