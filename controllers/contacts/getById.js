const { Contact } = require("../../models/contactModel");

const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
