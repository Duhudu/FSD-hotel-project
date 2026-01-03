const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
//import controller
const userHomePageRoomsController = require("../controllers/userHomePageRoomsController");
//Multer Configuration Storage (Where to save files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/userPic/");
  },
  filename: (req, file, cb) => {
    // Rename file to avoid duplicates
    cb(null, "user-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//Get all rooms to the home
router.get("/get", userHomePageRoomsController.getRoomsList);
module.exports = router;
