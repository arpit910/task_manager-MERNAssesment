import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateJWTToken from "../utils/generateToken.js";

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  res.send(users);
});

//@description     register new user
//@route           POST /api/user
//@access          Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .send(
        "Please Provide all the required fields, namely (name,email,password) "
      );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).send("User Already Exists");
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateJWTToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Authenticate user
//@route           POST /api/user/login
//@access          Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateJWTToken(user._id),
    });
  } else {
    res.status(401).send("Invalid Email or Passwords");
    throw new Error("Invalid Email or Password");
  }
});

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw { message: "User not found", code: "USER_NOT_FOUND" };
  }

  res.status(200).json({ success: true, data: user });
});

// Create a new user
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw { message: "Missing required fields", code: "INVALID_INPUT" };
  }

  const user = new User({ name, email, password });
  await user.save();

  res.status(201).json({ success: true, data: user });
});

// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw { message: "User not found", code: "USER_NOT_FOUND" };
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});
