const { updateMagazine } = require("../services/magazineServices");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../services/productServices");

const createProductCtrl = async (req, res) => {
  try {
    const magazineId = req.params.magazineId; // Assuming magazineId is in the URL
    console.log(magazineId);
    const body = req.body;

    const product = await createProduct(magazineId, body);

    const warehouse = await updateMagazine(magazineId, {
      $push: { products: product._id },
    });
    res
      .status(201)
      .json({ message: "Product created", data: product, warehouse });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
    console.error("Error creating product", error);
  }
};

const updateProductCtrl = async (req, res) => {
  try {
    const { id, magazineId } = req.params;
    const body = req.body;

    const updatedProduct = await updateProduct(id, magazineId, body);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
    console.error("Error updating product", error);
  }
};

const deleteProductCtrl = async (req, res) => {
  try {
    const { id, magazineId } = req.params;

    const product = await getProduct(id, magazineId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = await deleteProduct(id, magazineId);
    const warehouse = await updateMagazine(magazineId, {
      $pull: { products: id },
    });

    res.status(200).json({ message: "Product deleted", data: id, warehouse });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
    console.error("Error deleting product", error);
  }
};

const getProductCtrl = async (req, res) => {
  try {
    const { id, magazineId } = req.params;

    const product = await getProduct(id, magazineId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Error getting product", error });
    console.error("Error getting product", error);
  }
};

module.exports = {
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  getProductCtrl,
};
