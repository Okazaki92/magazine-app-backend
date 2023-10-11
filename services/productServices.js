const ProductModel = require("../models/productModel");

const createProduct = async (body) => {
  return ProductModel.create(body);
};

const updateProduct = async (id, body) => {
  return ProductModel.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
};

const deleteProduct = async (id) => {
  return ProductModel.findOneAndDelete({ _id: id });
};
