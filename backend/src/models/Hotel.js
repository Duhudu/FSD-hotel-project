const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
});

module.exports = mongoose.model("Hotel", hotelSchema);
