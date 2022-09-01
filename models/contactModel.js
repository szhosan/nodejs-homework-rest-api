const mongoose = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name required"],
    /* unique: true, */
  },
  email: {
    type: String,
    required: [true, "User email required"],
    /* unique: true, */
  },
  phone: {
    type: String,
    required: [true, "User phone number required"],
    /* unique: true, */
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

contactSchema.post("save", handleSchemaValidationErrors);

const codeRegexp = /^\(\d{3}\)\s\d{3}-\d{4}$/;

const joiAddContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .pattern(/^[a-zA-Z ]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(codeRegexp, "numbers").required(),
  favorite: Joi.boolean(),
});

const joiUpdateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = mongoose.model("contact", contactSchema);

const schemas = { joiAddContactSchema, joiUpdateContactFavoriteSchema };

module.exports = {
  Contact,
  schemas,
};
