const { StatusCodes } = require("http-status-codes");
const _ = require("lodash");
const { Post, validate: validatePost } = require("../model/Post");
const { User } = require("../model/User");

exports.getAllPost = async (req, res, next) => {
  try {
    const post = await Post.find({}, { updatedAt: 0, __v: 0 }).populate(
      "user",
      ["name"]
    );

    if (!post.length)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        data: post,
        message: "No Post Found",
      });

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      message: "Post Found",
      data: post,
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

exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", [
      "name",
      "email",
    ]);

    if (!post)
      return res.status(StatusCodes.OK).send({
        status: "Success",
        code: StatusCodes.OK,
        data: [],
        message: "No Post Found",
      });

    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: post,
      message: "No Post Found",
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

exports.addPost = async (req, res, next) => {
  try {
    const { error } = validatePost(req.body);
    if (error)
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: "Fail",
        code: StatusCodes.BAD_REQUEST,
        message: error.details.map((error) => error.message),
      });

    const { title, description, category, price } = req.body;

    const user = await User.findById(req.user._id);

    console.log(_.pick(user, ["name", "_id"]));
    let post = new Post({
      title,
      description,
      category,
      price,
      user: req.user._id,
    });

    await post.save();
    return res.status(StatusCodes.OK).send({
      status: "Success",
      code: StatusCodes.OK,
      data: _.pick(post, [
        "_id",
        "title",
        "description",
        "category",
        "price",
        "createdAt",
      ]),
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
