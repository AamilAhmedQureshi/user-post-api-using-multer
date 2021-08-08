const mongoose = require("mongoose");
const Joi = require("joi");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    user: {
      type: "String",
      required: true,
    },
    post_title: {
      type: "String",
      required: true,
      trim: true,
    },
    post_content: {
      type: "String",
      required: true,
      default: "",
    },
    file: {
      type: new mongoose.Schema({
        file_type: [String],
        file_name: [String],
      }),
    },
  })
);

async function validatePost(post) {
  const schema = Joi.object({
    userId: Joi.string().optional(),
    post_title: Joi.string().required(),
    post_content: Joi.string().optional(),
    file_name: Joi.array().optional(),
  });
  return schema.validate(post);
}

module.exports = { Post, validatePost };
