// Defining User Type
export interface IUser {
  _id?: string; // Using string for the ObjectId, as React/JS uses string for the ID
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

// Defining Priority Type
export interface IPriority {
  _id: string; // Using string for the ObjectId
  level: "Low" | "Medium" | "High";
  description?: string;
}

// Defining Task Type
export interface ITask {
  // _id: string; // Using string for the ObjectId
  title: string;
  description?: string;
  status: "To DO" | "Doing" | "Done" | string;
  priority: string; // Priority ID
  assignedTo: string[]; // Array of User IDs
  dueDate?: string | Date | Number | undefined; // Due date as string (you can adjust this based on how you want to handle dates)
}

// export interface ITaskInput {
//   title: string;
//   description: string;
//   status: "To Do" | "Doing" | "Done"; // Task status options
//   priority: string; // Priority ID (linked to Priority model)
//   assignedTo: string[]; // Array of User IDs assigned to the task
//   dueDate: string; // Date in ISO format (e.g., "2024-12-15")
// }
