const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FullName: String,
  Email: String,
  MobileNumber: Number,
  Password: String,
  ConfirmPassword: String,
  usertype: String,
});

module.exports = mongoose.model("newuser", UserSchema);
