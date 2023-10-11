const mongoose = require("mongoose");

const magazine = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const MagazineModel = mongoose.model("magazine", magazine);
module.exports = MagazineModel;
