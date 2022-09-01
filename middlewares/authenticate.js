const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const { createError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(createError(401, "Unauthorized"));
  }

  try {
    /* const { id } =  */ jwt.verify(token, SECRET_KEY);
    // jwt.verify - выбросит ошибку в случае если токен не верный

    const user = await User.findOne({ token });
    if (!user) {
      next(createError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError(401, error.message));
  }
};

module.exports = authenticate;
