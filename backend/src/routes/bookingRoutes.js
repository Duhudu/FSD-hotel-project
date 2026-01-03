const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//import controller
const bookingController = require("../controllers/bookingController");
//Get selected room
router.get("/selected/:id", bookingController.selectedRoom);
//Check Availability
router.post("/check-availability", bookingController.checkTypeAvailability);
//send the router
module.exports = router;
