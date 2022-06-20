const express = require("express");
const router = express.Router();

/* const Joi = require("joi");
const CreateError = require("http-errors"); */
const {
  getContacts,
  getContact,
  addContact,
  changeContact,
  deleteContact,
} = require("../../controllers/contacts");

/* const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z ]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+-[0-9]+-[0-9]+$/, "numbers")
    .required(),
}); */

const asyncWrapper = (controller) => {
  return (res, req, next) => controller(res, req).catch(next);
};

router.get("/", asyncWrapper(getContacts));

router.get(
  "/:contactId",
  asyncWrapper(getContact)
  /* async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      throw new CreateError(404, { message: "Not found" });
    }
  } */
);

router.post(
  "/",
  asyncWrapper(
    addContact /* async (req, res, next) => {
    const { name, email, number } = req.body;
    const contact = new Contact({ name, email, number });
    res.status(200).json(await contact.save());
  } */
  )
);

router.delete(
  "/:contactId",
  asyncWrapper(
    deleteContact /* async (req, res, next) => {
    const { contactId } = req.params;
    if (await contactOperations.removeContact(contactId)) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      throw new CreateError(404, { message: "Not found" });
    }
  } */
  )
);

router.put(
  "/:contactId",
  asyncWrapper(
    changeContact /* async (req, res, next) => {
    const { contactId } = req.params;
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, { message: "missing fields" });
    }
    const updatedContact = await contactOperations.updateContact(
      contactId,
      req.body
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      throw new CreateError(400, { message: "Not found" });
    }
  } */
  )
);

module.exports = router;
