const { Contact } = require("../models/contactModel");

const getContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const addContact = async ({ name, email, number }) => {
  const contact = new Contact({ name, email, number });
  return await contact.save();
};

const changeContactById = async (id, { name, email, number }) => {
  return await Contact.findByIdAndUpdate(id, { $set: { name, email, number } });
};

const deleteContactById = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
};
