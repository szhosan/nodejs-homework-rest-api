const { contacts } = require("../../services");
const createError = require("../../helpers/error");
const {
  joiAddContactSchema,
  joiUpdateContactFavoriteSchema,
} = require("../../models/contactModel");

const getContacts = async (req, res, next) => {
  res.json(await contacts.getContacts());
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    console.log("Contact: " + contact);
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.json(contact);
  } catch (e) {
    if (e.message.includes("ObjectId failed for value")) {
      e.status = 404;
      e.message = "Not found";
      next(e);
    }
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = joiAddContactSchema.validate(req.body);
    if (error) {
      console.log("I am: " + error.message);
      throw new Error(error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (e) {
    console.log("I am here: " + e.message);
    if (
      e.message.includes("fails to match") ||
      e.message.includes("duplicate key error")
    ) {
      e.status = 400;
    }
    next(e);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { error } = joiAddContactSchema.validate(req.body);
    if (error) {
      throw new Error(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await contacts.changeContactById(contactId, req.body);
    console.log(contact);
    if (!contact) {
      throw new Error(404, "Not found");
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contacts.deleteContactById(contactId);
    if (!deletedContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = joiUpdateContactFavoriteSchema.validate(req.body);
    if (error) {
      throw new Error(400, "missing field favorite");
    }
    const updatedContact = await contacts.updateStatusContactById(
      contactId,
      req.body
    );
    if (!updatedContact) {
      throw new Error(404, "Not found");
    }
    res.json(updatedContact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  changeContact,
  deleteContact,
  updateStatusContact,
};
