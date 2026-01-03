//import models
const Hotel = require("../models/Hotel");
const RoomType = require("../models/RoomType");
const Room = require("../models/Room");

//Logic to Add Rooms
exports.addRoom = async (req, res) => {
  console.log("Received data", req.body);
  console.log("Received files", req.files);

  try {
    // image data paths
    const imagePaths = req.files.map((f) => f.path);

    //Add data to hotel Schema (if its already there)
    let hotel = await Hotel.findOne({ location: req.body.roomLocation }); //select the location from the sent data

    //if con to stop data duplications (if the hotel's location is not in the system)
    if (!hotel) {
      hotel = await Hotel.create({
        name: "My Hotel",
        location: req.body.roomLocation,
      });
    }
    //Add data to roomType
    const roomType = await RoomType.create({
      hotelId: hotel._id,
      name: req.body.roomName,
      type: req.body.roomType,
      description: req.body.roomDescription,
      price: req.body.roomPrice,
      capacity: req.body.roomCapacity,
      size: req.body.roomSize,
      view: req.body.roomView,
      bedType: req.body.bedType,
      tagline: req.body.tagline,
      images: imagePaths, //connects the image data to the db
    });

    //Physical rooms
    const rooms = [];
    const start = parseInt(req.body.startingRoomNumber);
    //for loop to create the room ids for mul rooms from the given stating room number
    for (let i = 0; i < req.body.numberOfRooms; i++) {
      rooms.push({
        hotelId: hotel._id, // con to hotel id
        roomTypeId: roomType._id,
        roomNumber: `${start + i}`,
        floor: req.body.floor,
        status: req.body.defaultStatus,
      });
    }
    //Add multiple Rooms doc
    await Room.insertMany(rooms);
    //res.send("Rooms created successfully");
    res.json({ success: true, message: "Room added successful!" });
  } catch (err) {
    console.error("ADD ROOM ERROR:", err);
    res.status(500).send(err.message);
  }
};

//Logic to get rooms
exports.getRooms = async (req, res) => {
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

//Logic to Remove a room from the view
exports.removeRoom = async (req, res) => {
  try {
    //Access the id sent from the frontend
    const roomId = req.params.id;
    //Find the room by ID and update the status to "Deleted"
    const updatedRooms = await Room.findByIdAndUpdate(
      roomId,
      { status: "Deleted" },
      //send the updated doc to the frontend to updated the page
      { new: true }
    );
    if (!updatedRooms) {
      return res.status(404).json({ message: "Room not found" });
    }
    res
      .status(200)
      .json({ message: "Room Status Changed to Deleted", room: updatedRooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logic to select the room need to update
exports.selectRoom = async (req, res) => {
  try {
    //get id from the url
    const id = req.params.id;
    const selectedEditRoom = await Room.findById(id).populate({
      path: "roomTypeId",
      populate: { path: "hotelId" },
    });
    res.json(selectedEditRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Logic to update rooms
exports.updateRoom = async (req, res) => {
  //get the type id
  const { typeId } = req.params;
  const roomTypeId = typeId;
  //Process images
  let finalImages = [];
  if (req.body.existingImages) {
    finalImages = JSON.parse(req.body.existingImages);
  }
  //Add path for new images
  if (req.files && req.files.length > 0) {
    const newPaths = req.files.map((f) => f.path);
    //connect the new and old images set together
    finalImages = [...finalImages, ...newPaths];
  }
  //Prepare Updates
  const sharedUpdates = {
    name: req.body.roomName,
    type: req.body.roomType,
    description: req.body.roomDescription,
    price: req.body.roomPrice,
    capacity: req.body.roomCapacity,
    size: req.body.roomSize,
    view: req.body.roomView,
    bedType: req.body.bedType,
    tagline: req.body.tagline,
    // Save the combined list
    images: finalImages,
  };
  //Individual updates
  const individualUpdates = {
    location: req.body.location,
    floor: req.body.floor,
    status: req.body.defaultStatus,
  };
  //Update Database
  //shared details
  await RoomType.findByIdAndUpdate(roomTypeId, sharedUpdates);
  //Individual details
  await Room.updateMany(
    { roomTypeId: roomTypeId },
    { $set: individualUpdates }
  );
  res.json({ success: true, message: "Batch update successful!" });
};
