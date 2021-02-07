const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate: validateUser } = require("../model/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        data: [],
        message: "No User Found",
      });

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: users.map((user) =>
        _.pick(user, ["_id", "name", "email", "createdAt"])
      ),
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

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        data: [],
        message: "No User Found",
      });

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: _.pick(user, ["_id", "name", "email", "createdAt"]),
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

exports.signUp = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: error.details.map((error, index) => ({
          id: index,
          error: error.message,
        })),
      });
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: [{ id: 1, error: "User already registered." }],
      });

    user = User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = user.generateAuthToken();

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: _.pick(user, ["_id", "name", "email", "createdAt"]),
      token,
      message: [{ id: 1, value: "Account successfully created." }],
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
