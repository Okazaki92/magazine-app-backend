const ProductModel = require("../models/productModel");

const createProduct = async (magazineId, body) => {
  return ProductModel.create({ ...body, magazine: magazineId });
};

const updateProduct = async (id, magazineId, body) => {
  return ProductModel.findOneAndUpdate(
    { _id: id, magazine: magazineId },
    { ...body },
    { new: true }
  );
};

const deleteProduct = async (id, magazineId) => {
  return ProductModel.findOneAndDelete({ _id: id, magazine: magazineId });
};

const getProduct = async (id, magazineId) => {
  return ProductModel.findById({ _id: id, magazine: magazineId });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};
