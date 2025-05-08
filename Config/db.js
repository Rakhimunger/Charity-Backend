const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      "mongodb+srv://rakhimongre604:WYwfqdCJNcvgIqvO@cluster0.35lybdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/payments"
    );
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.error("MongoDB connection Error:", error.message);
  }
};

module.exports = connectDB;
