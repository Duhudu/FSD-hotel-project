//Middleware function to check backend validation
const validateRoomData = (req, res, next) => {
  const {
    roomName,
    roomType,
    roomDescription,
    roomLocation,
    roomPrice,
    roomCapacity,
    roomSize,
    roomView,
    floor,
    defaultStatus,
  } = req.body;

  //Validation Section
  //Name section
  if (!roomName || roomName.trim() === "") {
    return res.status(400).json({ message: "Backend: Room Name is missing" });
  }
  //Type Section
  if (!roomType || roomType.trim() === "") {
    return res.status(400).json({ message: "Backend: Room Type is missing" });
  }
  //Description Section
  if (!roomDescription || roomDescription.trim() === "") {
    return res
      .status(400)
      .json({ message: "Backend: Room Description is missing" });
  }
  //Location Section
  if (!roomLocation || roomLocation.trim() === "") {
    return res
      .status(400)
      .json({ message: "Backend: Room Description is missing" });
  }
  //Price Section
  if (!roomPrice || isNaN(roomPrice)) {
    return res.status(400).json({ message: "Backend: Invalid Price" });
  }
  //Capacity Section
  if (!roomCapacity || roomCapacity.trim() === "") {
    return res
      .status(400)
      .json({ message: "Backend: Room Capacity is missing" });
  }
  //Size Section
  if (!roomSize || isNaN(roomSize)) {
    return res.status(400).json({ message: "Backend: Invalid Size" });
  }
  //View Section
  if (!roomView || roomView.trim() === "") {
    return res.status(400).json({ message: "Backend: Room View is missing" });
  }
  //Floor Section
  if (!floor || floor.trim() === "") {
    return res.status(400).json({ message: "Backend: Room Floor is missing" });
  }
  //defaultStatus Section
  if (!defaultStatus || defaultStatus.trim() === "") {
    return res
      .status(400)
      .json({ message: "Backend: Room defaultStatus is missing" });
  }

  //if all good
  next();
};
module.exports = { validateRoomData };
