const mongoose = require("mongoose");
const User = require("../src/models/User");

const mongoUrl = "mongodb://root:1234@localhost:27017/hotelDB?authSource=admin";

async function seedUser() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to Mongo via Docker");

    const testUser = new User({
      firstName: "Test",
      lastName: "User",
      age: 25,
      email: "duhudu1wijesinghe@gmail.com",
      password: "123456",
      phoneNumber: "0771234567",
      profilePic: [],
    });

    await testUser.save();
    console.log("Test user inserted");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seedUser();
