const UserModel = require("../models/userModel");

const createUser = (values) => UserModel.create(values);

const getUserByEmail = (email) => UserModel.findOne({ email });

const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

const getUserById = (id) => UserModel.findById(id);

const verifyToken = (verificationToken) =>
  UserModel.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null },
    { new: true }
  );

module.exports = {
  createUser,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  verifyToken,
};
