const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const ifAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decodeToken.id,
      }).select("-password");
      if (user) {
        req.user = user;
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no failed");
  }
});
module.exports = { ifAuth };
