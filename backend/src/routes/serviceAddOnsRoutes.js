const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
//Import the controller
const serviceController = require("../controllers/serviceAddOnsController");
//Multer Configuration Storage (Where to save files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    // Rename file to avoid duplicates
    cb(null, "service-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//Set The Routes
// Url: /add
router.post(
  "/add",
  //Handle the file upload
  upload.array("icon", 1),
  //run the controller logic
  serviceController.addService
);
//Get all service data
router.get("/get", serviceController.getAll);
//Remove service
router.put("/remove/:id", serviceController.removeService);
//Get the selected service
router.get("/select/:id", serviceController.selectedService);
//Update service
router.put(
  "/update/:id",
  upload.array("icon", 1),
  serviceController.updateService
);
//send the router
module.exports = router;
