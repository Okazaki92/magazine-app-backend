const MagazineModel = require("../models/magazineModel");

const getAllMagazines = async (userId) => {
  return MagazineModel.find({ owner: userId });
};

const getMagazineById = async (id) => {
  return MagazineModel.findById(id).populate("products");
};

const createMagazine = async (userId, body) => {
  return MagazineModel.create({ owner: userId, ...body });
};

const deleteMagazine = async (id, userId) => {
  return MagazineModel.findOneAndDelete({ _id: id, owner: userId });
};

const updateMagazine = async (id, userId, body) => {
  return MagazineModel.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
};

module.exports = {
  getAllMagazines,
  getMagazineById,
  createMagazine,
  deleteMagazine,
  updateMagazine,
};
