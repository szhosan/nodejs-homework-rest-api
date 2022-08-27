const { isValidObjectId } = require("mongoose");

const { createError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    const error = createError(400, `${id} is not correct id format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
