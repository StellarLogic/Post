const { Profile, validate: validateProfile } = require("../model/Profile");
const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const { User } = require("../model/User");

// ########### Get Profile ##########
exports.myProfile = async (req, res, next) => {
  try {
    const profile = await Profile.find({}, { __v: 0, updatedAt: 0 });

    if (!profile.length)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        data: profile,
        message: "No profile Found",
      });

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      message: "profile Found",
      data: profile,
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

// ########### Add Profile ##########
exports.addProfile = async (req, res, next) => {
  try {
    const { error } = validateProfile(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: error.details.map((error, index) => ({
          id: index,
          error: error.message,
        })),
      });
    let profile = await Profile.find({ user: req.user._id });

    if (profile.length)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        data: _.pick(profile[0], ["_id", "phone", "image"]),
        message: "Profile Already Exist.",
      });

    const { phone } = req.body;
    profile = new Profile({
      phone,
      user: req.user._id,
    });

    if (req.file) {
      profile.image.name = req.file.filename;
      profile.image.path = req.file.path;
    }

    await profile.save();
    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: _.pick(profile, ["_id", "phone", "image"]),
      message: [
        {
          id: 1,
          value: "Profile successfully created.",
        },
      ],
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

// ########### Update Profile ##########
exports.updateProfile = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const profile = await Profile.findOne({ user: req.user._id });
    console.log(user);
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "Fail",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Server Error",
    });
  }
};
