const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "Fail",
      code: StatusCodes.UNAUTHORIZED,
      message: "Access denied. No token provided",
    });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: "Fail",
      code: StatusCodes.BAD_REQUEST,
      message: "Invalid Token",
    });
  }
};
