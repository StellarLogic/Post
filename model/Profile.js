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
    address: {
      street: String,
      city: String,
      state: String,
      zip: Number,
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
      .label("Phone Number"),
    street: Joi.string().label("Street"),
    city: Joi.string().label("City"),
    state: Joi.string().label("State"),
    zip: Joi.string().length(6).label("Zip"),
    image: Joi.object(),
    name: Joi.string(),
    currentPassword: Joi.string(),
    newPassword: Joi.string(),
  });
  return profileSchema.validate(profile, {
    abortEarly: false,
  });
};

exports.Profile = mongoose.model("profile", profileSchema);
