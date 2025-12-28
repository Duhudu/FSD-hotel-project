//import models
const Hotel = require("../models/Hotel");
const RoomType = require("../models/RoomType");
const Room = require("../models/Room");
const User = require("../models/User");

exports.getRoomsList = async (req, res) => {
  try {
    const roomAllData = await Room.find().populate({
      path: "roomTypeId",
      populate: { path: "hotelId" },
    });
    res.json(roomAllData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
