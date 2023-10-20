const express = require("express");
const {
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
} = require("../controllers/productController");
const { isAuthenticated } = require("../helpers/auth");

const productRouter = express.Router();

productRouter.post("/:magazineId/products", isAuthenticated, createProductCtrl);
productRouter.patch(
  "/:magazineId/products/:id",
  isAuthenticated,
  updateProductCtrl
);
productRouter.delete(
  "/:magazineId/products/:id",
  isAuthenticated,
  deleteProductCtrl
);
productRouter.get("/:magazineId/products/:id", isAuthenticated, getProductCtrl);

module.exports = productRouter;
