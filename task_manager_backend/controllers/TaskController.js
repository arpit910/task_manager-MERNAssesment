import asyncHandler from "express-async-handler";
import Task from "../models/task.js";
import User from "../models/user.js";
import Priority from "../models/Priority.js";

//@description     Get all tasks
//@route           GET /api/tasks
//@access          Private
export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name email");
  res.status(200).json(tasks);
});

//@description     Create a new task
//@route           POST /api/tasks
//@access          Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title || !priority) {
    res.status(400);
    throw new Error("Title and priority are required");
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
  });

  res.status(201).json(task);
});

//@description     Get a single task by ID
//@route           GET /api/tasks/:id
//@access          Private
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email"
  );

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json(task);
});

//@description     Update a task
//@route           PUT /api/tasks/:id
//@access          Private
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.dueDate = dueDate || task.dueDate;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

//@description     Delete a task
//@route           DELETE /api/tasks/:id
//@access          Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.remove();
  res.status(200).json({ message: "Task removed successfully" });
});

//@description     Assign a user to a task
//@route           PUT /api/tasks/:taskId/assign
//@access          Private
export const assignUsersToTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { userIds } = req.body; // Expecting an array of user IDs
  console.log(taskId, userIds);
  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if all userIds exist
  const users = await User.find({ _id: { $in: userIds } });
  if (users.length !== userIds.length) {
    res.status(404);
    throw new Error("One or more users not found");
  }

  // Avoid duplicates
  const uniqueUsers = Array.from(new Set([...task.assignedTo, ...userIds]));

  task.assignedTo = uniqueUsers;
  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
});

//@description     Get tasks assigned to a user
//@route           GET /api/tasks/assigned/:userId
//@access          Private
export const getTasksForUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const tasks = await Task.find({ assignedTo: userId });
  res.status(200).json(tasks);
});

//@description     Get tasks by priority
//@route           GET /api/tasks/assigned/:userId
//@access          Private
export const getTaskByPriority = asyncHandler(async (req, res) => {
  const { priorityId } = req.params;

  const priority = await Priority.findById(priorityId);

  if (!priority) {
    res.status(404);
    throw new Error("User not found");
  }

  const tasks = await Task.find({ priority: priority });
  res.status(200).json(tasks);
});

//@description     Unassign a user from task
//@route           GET /api/tasks/unAssign/:userId
//@access          admin
export const unassignUserFromTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Remove the user from the assignedTo array
  task.assignedTo = task.assignedTo.filter((id) => id.toString() !== userId);

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
});

// Update task priority
export const updateTaskPriority = async (req, res) => {
  const { priority } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { priority },
    { new: true }
  ).populate("priority assignedTo");
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("priority assignedTo");
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

export const getUsersByTaskId = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  // Find the task by its ID
  const task = await Task.findById(taskId).populate("assignedTo", "name email");
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Return the users assigned to the task
  res.status(200).json(task.assignedTo);
});
