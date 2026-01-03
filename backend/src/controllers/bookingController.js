const Hotel = require("../models/Hotel");
const RoomType = require("../models/RoomType");
const Room = require("../models/Room");
const Booking = require("../models/bookings");
//Get the selected room
exports.selectedRoom = async (req, res) => {
  try {
    //get id from the url
    const id = req.params.id;
    const selectedRoom = await Room.findById(id).populate({
      path: "roomTypeId",
      populate: { path: "hotelId" },
    });
    res.json({
      success: true,
      data: selectedRoom,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// check the room availability
exports.checkTypeAvailability = async (req, res) => {
  try {
    //get data
    const { typeId, checkInDate, checkOutDate } = req.body;
    // Validate Dates
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    //validation
    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }
    //Find ALL rooms of this Type
    const allRoomsOfType = await Room.find({
      roomTypeId: typeId,
    });
    if (allRoomsOfType.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No rooms found." });
    }
    const allRoomIds = allRoomsOfType.map((room) => room._id);
    //Find Conflicting Bookings
    const conflictingBookings = await Booking.find({
      //$in === inlist
      roomId: { $in: allRoomIds },
      //$ne == not equal
      status: { $ne: "Cancelled" },
      $or: [
        {
          checkInDate: { $lt: end },
          checkOutDate: { $gt: start },
        },
      ],
    });
    //Filter to find the first Available Room
    const bookedRoomIds = conflictingBookings.map((b) => b.roomId.toString());
    const availableRooms = allRoomsOfType.filter(
      (room) => !bookedRoomIds.includes(room._id.toString())
    );
    if (availableRooms.length > 0) {
      res.json({
        success: true,
        available: true,
        message: "Room available",
        //pick the first ava room
        suggestedRoomId: availableRooms[0]._id,
      });
    } else {
      res.json({
        success: false,
        available: false,
        message: "All rooms of this type are booked.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
