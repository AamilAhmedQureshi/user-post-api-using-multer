const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    birth_date: {
      type: Date,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "",
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    pin_code: {
      type: Number,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
  })
);

/* ================> Auth validate <=======================*/
async function validateAuth(auth) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(auth);
}

/* ================> User validate <=======================*/
async function validateUser(user) {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    birth_date: Joi.string().optional(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.string().min(8).required(),
    gender: Joi.string().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    pin_code: Joi.string().optional(),
    country: Joi.string().optional(),
  });
  return schema.validate(user);
}

module.exports = { User, validateUser, validateAuth };
