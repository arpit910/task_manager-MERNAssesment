import { IUser, IPriority, ITask } from "../types"; // Import the types for tasks, users, and priorities

// Mock Users
export const users: IUser[] = [
  {
    _id: "67540cda7fe385662f0fd106",
    name: "aadarsh",
    email: "aadrshkhurai@gmail.com",
    password: "$2b$10$5kGp0DK.iCIIIBJI0r8DfOURI55MhR2dtyJTBUt6g0BT9CMiD/Coa",
    isAdmin: false,
  },
];

// Mock Priorities
export const priorities: IPriority[] = [
  {
    _id: "67541e0ece5768542e6eafbe",
    level: "Low",
    description: "Low priority tasks",
  },
  {
    _id: "67541e2cce5768542e6eafbf",
    level: "Medium",
    description: "Medium priority tasks",
  },
  {
    _id: "67541e67ce5768542e6eafc0",
    level: "High",
    description: "High priority tasks",
  },
];

// // Mock Tasks
// export const tasks: ITask[] = [
//   {
//     _id: "1",
//     title: "Finish Project Report",
//     description: "Complete the final report for the project.",
//     status: "Doing",
//     priority: priorities[0]._id, // Low priority
//     assignedTo: [users[0]._id, users[1]._id],
//     dueDate: "2024-12-15",
//   },
//   {
//     _id: "2",
//     title: "Design the Homepage",
//     description: "Create a wireframe for the homepage of the website.",
//     status: "To DO",
//     priority: priorities[1]._id, // Medium priority
//     assignedTo: [users[1]._id, users[2]._id],
//     dueDate: "2024-12-20",
//   },
//   {
//     _id: "3",
//     title: "Fix Bug in Authentication",
//     description: "Resolve the bug causing login issues.",
//     status: "Done",
//     priority: priorities[2]._id, // High priority
//     assignedTo: [users[3]._id],
//     dueDate: "2024-12-10",
//   },
//   {
//     _id: "4",
//     title: "Create Unit Tests",
//     description: "Write unit tests for the new feature.",
//     status: "To DO",
//     priority: priorities[1]._id, // Medium priority
//     assignedTo: [users[0]._id, users[2]._id],
//     dueDate: "2024-12-25",
//   },
//   {
//     _id: "5",
//     title: "API Documentation",
//     description: "Update the API documentation for the new endpoints.",
//     status: "Doing",
//     priority: priorities[0]._id, // Low priority
//     assignedTo: [users[2]._id],
//     dueDate: "2024-12-12",
//   },
// ];
