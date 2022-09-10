const login = require("./login");
const register = require("./register");
const logout = require("./logout");
const current = require("./current");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
  login,
  register,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
};
