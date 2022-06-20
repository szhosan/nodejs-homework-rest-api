const { contacts } = require("../services");
const createError = require("../helpers/error");

const getContacts = async (req, res, next) => {
  res.json(await contacts.getContacts());
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const addContact = async (req, res, next) => {};

const changeContact = async (req, res, next) => {};

const deleteContact = async (req, res, next) => {};

module.exports = {
  getContacts,
  getContact,
  addContact,
  changeContact,
  deleteContact,
};
