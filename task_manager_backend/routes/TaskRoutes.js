import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  assignUsersToTask,
  updateTaskPriority,
  updateTaskStatus,
  getAllTasks,
  getTaskByPriority,
  unassignUserFromTask,
  getUsersByTaskId,
} from "../controllers/taskController.js";

const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);

// Create a new task
router.post("/", createTask);

// Get a task by ID
router.get("/:id", getTaskById);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

// Assign users to a task
router.put("/:taskId/assign-users", assignUsersToTask);

// Assign users to a task
router.put("/:id/remove-users", unassignUserFromTask);

// Update task priority
router.put("/:id/update-priority", updateTaskPriority);

// Get task priority
router.get("/priority/:priorityId", getTaskByPriority);

// Update task status
router.put("/:id/update-status", updateTaskStatus);

router.get("/:taskId/users", getUsersByTaskId);

export default router;
