const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  verificationToken: { type: String, select: false, required: true },
  verify: { type: Boolean, default: false, select: false },
});

const UserModel = mongoose.model("user", user);
module.exports = UserModel;
