const { User } = require("../../models/userModel");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "logout successful" });
};

module.exports = logout;
