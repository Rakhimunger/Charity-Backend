const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      "mongodb+srv://Nikhil:Nikhil%40123@cluster0.nvyzj.mongodb.net/myDatabase?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.error("MongoDB connection Error:", error.message);
  }
};

module.exports = connectDB;
