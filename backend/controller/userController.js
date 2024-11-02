const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  const { name, email, password } = req.body;

  const alreadyExist = await User.findOne({ email });
  if (alreadyExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const loginUser = await User.findOne({ email });

  if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
    res.status(200).json({
      message: "Login successful",
      data: {
        name: loginUser.name,
        email: loginUser.email,
        token: generateToken(loginUser._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const getMe = (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    message: "User data displayed",
    data: {
      id: _id,
      name,
      email,
    },
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
