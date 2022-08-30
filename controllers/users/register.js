const bcrypt = require("bcryptjs");

const { createError } = require("../../helpers");

const { User } = require("../../models/userModel");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `User with such email:"${email}" already exists`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashedPassword });
  res.status(201).json({ email: result.email });
};

module.exports = register;
