import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["To DO", "Doing", "Done"],
      default: "Pending",
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Priority", // Reference to the Priority schema
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to your existing User schema
        required: true,
      },
    ],
    dueDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Models
const Task = mongoose.model("Task", TaskSchema);

export default Task;
