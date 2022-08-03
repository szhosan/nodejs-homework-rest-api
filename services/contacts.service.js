const { Contact } = require("../models/contactModel");

const getContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({ name, email, phone, favorite });
  return await contact.save();
};

const changeContactById = async (id, { name, email, phone, favorite }) => {
  return await Contact.findByIdAndUpdate(id, {
    $set: { name, email, phone, favorite },
  });
};

const deleteContactById = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

const updateStatusContactById = async (id, { favorite }) => {
  return await Contact.findByIdAndUpdate(id, { $set: { favorite } });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContactById,
};
