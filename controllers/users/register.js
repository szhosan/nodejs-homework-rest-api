const bcrypt = require("bcryptjs");

const { createError, sendEmail } = require("../../helpers");

const { User } = require("../../models/userModel");

const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `User with such email:"${email}" already exists`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Верифікація почтової адреси",
    html: `<a href="localhost:3001/api/users/verify/${verificationToken} target="_blank">Перейдіть за посиланням для верифікації поштової адреси</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({ email: result.email });
};

module.exports = register;
