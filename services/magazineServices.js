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

const deleteMagazine = async (id) => {
  return MagazineModel.findOneAndDelete({ _id: id });
};

const updateMagazine = async (id, body) => {
  return MagazineModel.findOneAndUpdate(
    { _id: id },
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
