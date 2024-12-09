import mongoose from "mongoose";

// Priority Schema
const PrioritySchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"], // Define fixed priority levels
    required: true,
  },
  description: {
    type: String,
    required: false, // Optional field to explain the priority level
  },
});

const Priority = mongoose.model("Priority", PrioritySchema);

export default Priority;
