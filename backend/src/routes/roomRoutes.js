const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Import Controller and Validation
const roomController = require("../controllers/roomController");
const { validateRoomData } = require("../helpers/AddRooms_Server_validations");

//Multer Configuration Storage (Where to save files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    // Rename file to avoid duplicates
    cb(null, "room-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//Define Routes
// URL:/add
router.post(
  "/add",
  //Handle File Upload
  upload.array("roomImages", 8),
  //Run Validation
  validateRoomData,
  //Run Controller Logic
  roomController.addRoom
);

// URL: /get
router.get("/get", roomController.getRooms);

//Remove rooms from the "view" change the status from Ready to Delete to remvoe it from the view
//URL: /remove
router.put("/remove/:id", roomController.removeRoom);

//Get room to update
router.get("/select/:id", roomController.selectRoom);
//URL: /update
router.put(
  "/update/:typeId",
  upload.array("images", 8),
  roomController.updateRoom
);
//send the router
module.exports = router;
