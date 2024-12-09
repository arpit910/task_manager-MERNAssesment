import Priority from "../models/Priority.js";

// Get all priorities
export const getPriorities = async (req, res) => {
  const priorities = await Priority.find();
  res.json(priorities);
};

// Create a new priority
export const createPriority = async (req, res) => {
  const { level, description } = req.body;
  const priority = new Priority({ level, description });
  await priority.save();
  res.status(201).json(priority);
};

// Update a priority
export const updatePriority = async (req, res) => {
  const priority = await Priority.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!priority) {
    return res.status(404).json({ message: "Priority not found" });
  }
  res.json(priority);
};

// Delete a priority
export const deletePriority = async (req, res) => {
  const priority = await Priority.findByIdAndDelete(req.params.id);
  if (!priority) {
    return res.status(404).json({ message: "Priority not found" });
  }
  res.json({ message: "Priority deleted successfully" });
};
