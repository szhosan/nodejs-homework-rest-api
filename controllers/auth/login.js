// const bcrypt = require("bcryptjs");

const { User } = require("../../models/userModel");

const { createError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email not found");
  }

  // const comparePassword = await bcrypt.compare(password, user.password);

  const comparePassword = await user.validatePassword(password);

  console.log(comparePassword);

  if (!comparePassword) {
    throw createError(401, "Password is wrong");
  }

  const token = "this is token";
  res.json({ token });
};

module.exports = login;
