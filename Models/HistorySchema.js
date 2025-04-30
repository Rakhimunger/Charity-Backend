const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: String,
  ContactNamber: Number,
  category: String,
});

module.exports = mongoose.model("User", userSchema);
