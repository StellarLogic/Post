const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../model/User");
const { Profile, validate: validateProfile } = require("../model/Profile");

// ########### Get Profile ##########
exports.myProfile = async (req, res, next) => {
  try {
    const profile = await Profile.find(
      { user: req.user._id },
      { __v: 0, updatedAt: 0 }
    ).populate("user", ["name", "email"]);

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
        data: _.pick(profile[0], ["_id", "phone", "image", "address"]),
        message: "Profile Already Exist.",
      });

    const { phone, street, city, state, zip } = req.body;
    profile = new Profile({
      phone,
      user: req.user._id,
      address: {
        street,
        city,
        state,
        zip,
      },
    });

    if (req.file) {
      profile.image.name = req.file.filename;
      profile.image.path = req.file.path;
    }

    await profile.save();
    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: _.pick(profile, ["_id", "phone", "image", "address"]),
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
    const {
      name,
      phone,
      street,
      city,
      state,
      zip,
      currentPassword,
      newPassword,
    } = req.body;

    await validatePassword(req, res);

    if (name) {
      await User.findByIdAndUpdate(req.user._id, { name: name }, { new: true });
    }

    if (req.file) {
      const { filename, path } = req.file;
      await Profile.findOneAndUpdate(
        { user: req.user._id },
        { image: { name: filename, path } }
      );
    }

    if (phone)
      await Profile.findOneAndUpdate({ user: req.user._id }, { phone });
    if (street)
      await Profile.findOneAndUpdate(
        { user: req.user._id },
        { address: { street, city, state, zip } }
      );

    const profile = await Profile.findOne(
      { user: req.user._id },
      { _v: 0, updatedAt: 0 }
    ).populate("user", ["name", "email"]);

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: profile,
      message: ["Profile successfully updated."],
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

const validatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (currentPassword || newPassword) {
    if (!currentPassword)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        message: ["Current Password Required"],
      });

    if (!newPassword)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        message: ["New Password Required"],
      });

    const user = await User.findById(req.user._id);
    const passcheck = await bcrypt.compare(currentPassword, user.password);
    if (!passcheck)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        message: ["Current Password is not correct"],
      });

    const salt = await bcrypt.genSalt(10);
    updatedHashedPass = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(
      req.user._id,
      { password: updatedHashedPass },
      { new: true }
    );

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      message: ["Password Successfully Updated"],
    });
  }
};
