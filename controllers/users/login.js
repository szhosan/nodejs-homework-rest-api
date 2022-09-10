// const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { User } = require("../../models/userModel");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email not found");
  }

  // const comparePassword = await bcrypt.compare(password, user.password);

  const comparePassword = await user.validatePassword(password);

  if (!comparePassword) {
    throw createError(401, "Password is wrong");
  }

  if (!user.verify) {
    throw createError(400, "Email is not verified");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
