const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const createError = require("./error");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "s.zhosan@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    return createError(500, "Failed to send email");
  }
};

module.exports = sendEmail;
