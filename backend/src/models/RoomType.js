const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  name: String,
  type: String,
  description: String,
  price: Number,
  capacity: Number,
  size: String,
  view: String,
  bedType: String,
  tagline: String,
  images: [String],
});

module.exports = mongoose.model("RoomType", roomTypeSchema);
