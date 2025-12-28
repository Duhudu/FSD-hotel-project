const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import Routes
const roomRoutes = require("./src/routes/roomRoutes");
const homePageRoutes = require("./src/routes/homeRoutes");
const app = express();
const port = 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve image Files
//app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Database Connection
const mongoUrl =
  "mongodb://root:1234@Hotel-mongo-database:27017/hotelDB?authSource=admin";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to Mongo via Docker"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// This connects "roomRoutes"
app.use(roomRoutes); //send (post) rooms to the database
app.use(homePageRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend server is running on port ${port}`);
});
