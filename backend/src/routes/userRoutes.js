const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/userController");

//get all users to test without login
router.get("/get", userController.getAllUsers);
//get selected (logged) in user
router.get("/selected/:id", userController.getUser);
module.exports = router;
