const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// Register
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    if (!name || !password || !contact || !email) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({ name, email, password, contact });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//  Login
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = {
  registerUser,
  authUser,
};
