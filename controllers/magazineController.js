const { createMagazine } = require("../services/magazineServices");

const createNewMag = async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
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
  } catch (error) {}
};
const updateMag = async (req, res, next) => {
  try {
  } catch (error) {}
};
const getAllMag = async (req, res, next) => {
  try {
  } catch (error) {}
};
const getMagById = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = {
  createNewMag,
};
