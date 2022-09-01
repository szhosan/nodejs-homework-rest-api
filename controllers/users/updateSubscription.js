const { User } = require("../../models/userModel");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    message: `current user subscription is changed to: ${subscription}`,
  });
};

module.exports = updateSubscription;
