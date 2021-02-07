const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET
  );
};

exports.validate = (user) => {
  const userSchema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    // password: Joi.string().min(5).max(250).required().label("Password"),
    password: Joi.string().required().label("Password"),
  });

  return userSchema.validate(user, {
    abortEarly: false,
  });
};

exports.User = mongoose.model("user", userSchema);
