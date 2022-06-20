const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "User email required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "User phone number required"],
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

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

module.exports = {
  Contact,
  joiAddContactSchema,
  joiUpdateContactFavoriteSchema,
};
