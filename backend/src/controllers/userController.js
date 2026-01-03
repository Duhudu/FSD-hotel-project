const User = require("../models/User");

//getAllUsers
exports.getAllUsers = async (req, res) => {
  try {
    const usersAllData = await User.find();
    res.json(usersAllData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//logic to get he selected user
exports.getUser = async (req, res) => {
  try {
    //get id from the url
    const id = req.params.id;
    const selectedUser = await User.findById(id);
    res.json(selectedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
