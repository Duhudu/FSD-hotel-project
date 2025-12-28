const mongoose = require("mongoose");
const Hotel = require("./Hotel");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  password: String,
  email: String,
  phoneNumber: Number,
  profilePic: [String],
});
module.exports = mongoose.model("User", userSchema);
