const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: {
    type: String,
    enum: ["m2", "m", "st"],
    required: true,
  },
});

const ProductModel = mongoose.model("product", product);
module.exports = ProductModel;
