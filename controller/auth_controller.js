const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../model/User");

exports.signIn = async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: error.details.map((error) => error.message),
      });
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: "Invalid Email or Password.",
      });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: "Invalid Email or Password.",
      });

    const token = user.generateAuthToken();

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: { user: _.pick(user, ["_id", "name", "email"]), token },
      message: "User logged in successfully.",
    });
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "Fail",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Server Error",
    });
  }
};

const validate = (user) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return userSchema.validate(user, {
    abortEarly: false,
  });
};
