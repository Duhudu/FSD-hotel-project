//Import the model
const ServiceAddOns = require("../models/ServiceAddOns");

//Logic to add the serviceAddOns
exports.addService = async (req, res) => {
  console.log("Received data", req.body);
  console.log("Received files", req.files);
  try {
    //image data paths
    const iconPaths = req.files.map((f) => f.path);
    //Add the add to db using the imported model Schema
    const serviceAddOns = await ServiceAddOns.create({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      price: req.body.price,
      icon: iconPaths,
    });
    //res.send("Service  created successfully");
    res.json({ success: true, message: "Service Add Successfully!" });
  } catch (err) {
    console.error("ADD Service ERROR:", err);
    res.status(500).send(err.message);
  }
};
//Logic to get all data
exports.getAll = async (req, res) => {
  try {
    const AllServiceData = await ServiceAddOns.find({ status: "Active" });
    res.status(200).json(AllServiceData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Logic to delete service
exports.removeService = async (req, res) => {
  try {
    //get the sent id
    const serviceId = req.params.id;
    //Find the Service and update the status to deleted
    const updatedStatus = await ServiceAddOns.findByIdAndUpdate(
      serviceId,
      { status: "Deleted" },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      message: "Service Status Changed to Deleted",
      service: updatedStatus,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Get the selectedService
exports.selectedService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    //find and get the data
    const selectedServiceData = await ServiceAddOns.findById(serviceId);
    res.json(selectedServiceData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//updateService
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const currentService = await ServiceAddOns.findById(serviceId);
    if (!currentService) {
      return res.status(404).json({ message: "Service not found" });
    }
    let finalImages = currentService.icon || [];
    if (req.files && req.files.length > 0) {
      const newPaths = req.files.map((f) => f.path);
      // Combine old list with new list
      finalImages = [...finalImages, ...newPaths];
    }
    //Update details
    const updatedService = await ServiceAddOns.findByIdAndUpdate(
      serviceId,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        icon: finalImages, // Save the combined list
      },
      { new: true } // Return the updated document
    );
    res.json({ success: true, message: "Update successful!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
