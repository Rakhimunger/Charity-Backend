const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      "mongodb+srv://rakhimongre604:3Tkfe9pi6SRC2Dr3@cluster0.sgjhg8i.mongodb.net/payments"
    );
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.error("MongoDB connection Error:", error.message);
  }
};

module.exports = connectDB;
