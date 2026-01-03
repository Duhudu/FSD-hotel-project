const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceAddOns" }],
    checkInDate: Date,
    checkOutDate: Date,
    numberOfdays: Number,
    totalPrice: Number,
    status: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booking", bookingSchema);
