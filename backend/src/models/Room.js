const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType" },
  roomNumber: String,
  floor: Number,
  status: String,
});

module.exports = mongoose.model("Room", roomSchema);
