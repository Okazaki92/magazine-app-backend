const {
  createMagazine,
  getAllMagazines,
  updateMagazine,
  deleteMagazine,
  getMagazineById,
} = require("../services/magazineServices");

const createNewMag = async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.identity._id;
    console.log(user);
    if (!user || !user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const warehouse = await createMagazine(user._id, body);
    res.status(200).json({ message: "New Warehouse created", data: warehouse });
  } catch (error) {
    res.status(404).json({
      message: "Error in creating new magazine",
      error,
    });
    console.log("Error in creating new magazine");
  }
};
const deleteMag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.identity._id;

    if (!userId) {
      return res.status(500).json("No user found");
    }

    const deletedWarehouse = await deleteMagazine(id);

    if (!deletedWarehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res
      .status(200)
      .json({ message: "Warehouse deleted", data: deletedWarehouse });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting magazine",
      error,
    });
    console.error("Error in deleting magazine", error);
  }
};
const updateMag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.identity._id;
    const body = req.body;

    console.log(userId);
    if (!userId) {
      return res.status(500).json("No user found");
    }

    const updatedWarehouse = await updateMagazine(id, body);

    if (!updatedWarehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res
      .status(200)
      .json({ message: "Warehouse updated", data: updatedWarehouse });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating magazine",
      error,
    });
    console.error("Error in updating magazine", error);
  }
};

const getAllMag = async (req, res, next) => {
  try {
    const userId = req.identity._id;
    const warehouses = await getAllMagazines(userId);
    console.log(warehouses);
    res.status(200).json({ data: warehouses });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting all magazines",
      error,
    });
    console.error("Error in getting all magazines", error);
  }
};

const getMagById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const warehouse = await getMagazineById(id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(200).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting magazine by ID",
      error,
    });
    console.error("Error in getting magazine by ID", error);
  }
};

module.exports = {
  createNewMag,
  deleteMag,
  updateMag,
  getAllMag,
  getMagById,
};
