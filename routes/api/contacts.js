const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  addContact,
  changeContact,
  deleteContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
