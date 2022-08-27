const { Contact } = require("../../models/contactModel");

const getAll = async (_, res) => {
  res.json(await Contact.find({} /*, "-createdAt -updatedAt"  */));
};

module.exports = getAll;
