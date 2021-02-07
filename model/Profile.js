const mongoose = require("mongoose");
const Joi = require("joi");

const profileSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      require: true,
    },
    image: {
      name: {
        type: String,
      },
      path: {
        type: String,
      },
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

exports.validate = (profile) => {
  const profileSchema = Joi.object({
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .label("Phone Number"),
    image: Joi.object(),
  });
  return profileSchema.validate(profile, {
    abortEarly: false,
  });
};

exports.Profile = mongoose.model("profile", profileSchema);
