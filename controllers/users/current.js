const { User } = require("../../models/userModel");

const current = async (req, res) => {
  const { _id } = req.user;
  const { email, subscription } = await User.findById(_id);
  res.json({ email, subscription });
};

module.exports = current;
