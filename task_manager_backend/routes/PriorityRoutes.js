import express from "express";
import {
  getPriorities,
  createPriority,
  updatePriority,
  deletePriority,
} from "../controllers/PriorityControler.js";

const router = express.Router();

// Get all priorities
router.get("/", getPriorities);

// Create a new priority
router.post("/", createPriority);

// Update an existing priority
router.put("/:id", updatePriority);

// Delete a priority
router.delete("/:id", deletePriority);

export default router;
