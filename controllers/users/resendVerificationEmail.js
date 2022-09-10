const { User } = require("../../models/userModel");

const { createError, sendEmail } = require("../../helpers");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "Not found");
  }
  if (user.verify) {
    throw createError(404, "User already verified");
  }

  const mail = {
    to: email,
    subject: "Верифікація почтової адреси",
    html: `<a href="localhost:3001/api/users/verify/${user.verificationToken} target="_blank">Перейдіть за посиланням для верифікації поштової адреси</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Email verification letter was resent",
  });
};

module.exports = resendVerificationEmail;
