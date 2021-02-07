const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

exports.validate = (post) => {
  const postSchema = Joi.object({
    title: Joi.string().min(5).max(20).required().label("Title"),
    description: Joi.string().min(10).max(500).required().label("Description"),
    category: Joi.string().required().label("Category"),
    price: Joi.string().required().label("Price"),
  });

  return postSchema.validate(post, {
    abortEarly: false,
  });
};

exports.Post = mongoose.model("post", postSchema);
