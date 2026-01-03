const mongoose = require("mongoose");
const serviceAddOnsSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  price: Number,
  icon: [String],
});
module.exports = mongoose.model("ServiceAddOns", serviceAddOnsSchema);
