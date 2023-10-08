require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      dbName: "Magazine-App",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connect failed " + error.message);
  }
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// module.exports = app;
