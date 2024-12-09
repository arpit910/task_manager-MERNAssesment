import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  authUser,
} from "../controllers/userController.js";

const router = express.Router();

// Get all users
router.get("/", getUsers);

// Create a new user
router.post("/", createUser);

// authenticate a user
router.post("/login", authUser);

// Get a user by ID
router.get("/:id", getUserById);

// Delete a user
router.delete("/:id", deleteUser);

export default router;
