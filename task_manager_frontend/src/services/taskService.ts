import axios from "axios";
import { ITask, IUser } from "../types";
import { users } from "../data/task";

const API_BASE_URL = "http://localhost:8000/api/tasks"; // Update with your API URL

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    throw (
      error.response?.data || {
        message: "Unable to fetch tasks",
        code: "TASK_FETCH_ERROR",
      }
    );
  }
};

export const getTasksByPriority = async (
  priorityId: string
): Promise<ITask[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/priority/${priorityId}`);
    return response.data; // Assuming API returns an array of tasks
  } catch (error: any) {
    console.error("Error fetching tasks by priority:", error.message || error);
    throw new Error("Failed to fetch tasks by priority");
  }
};

export const fetchTasksByPriority = async (
  priorities: { _id: string; level: string }[]
) => {
  try {
    const tasksByPriority: Record<string, ITask[]> = {};

    // Use Promise.all to handle async calls for each priority
    const tasksPromises = priorities.map(async (priority) => {
      const tasks = await getTasksByPriority(priority._id);
      return { level: priority.level, tasks };
    });

    const tasksResults = await Promise.all(tasksPromises);

    // Map results into the tasksByPriority object
    tasksResults.forEach(({ level, tasks }) => {
      tasksByPriority[level] = tasks;
    });

    return tasksByPriority;
  } catch (error) {
    console.error("Error fetching tasks by priority:", error);
    throw error;
  }
};

// Service to add a task
export const createTask = async (taskData: ITask) => {
  console.log(taskData);
  const response = await axios.post(`${API_BASE_URL}/`, taskData, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get("http://localhost:8000/api/users/");
  return response.data;
};

// Service to assign a user to a task
export const assignUserToTask = async (
  taskId: string,
  userIds: string[]
): Promise<void> => {
  try {
    console.log(userIds, taskId);
    const response = await axios.put(`${API_BASE_URL}/${taskId}/assign-users`, {
      userIds: userIds,
    });
    return response.data; // Return the updated task or any necessary data
  } catch (error) {
    throw new Error("Failed to add user to task");
  }
};

export const removeUserFromTask = async (taskId: string, userId: string) => {
  try {
    const response = await axios.put(`/:${taskId}/remove-users`, {
      userId,
    });
    return response.data; // Return the updated task or any necessary data
  } catch (error) {
    throw new Error("Failed to remove user from task");
  }
};

export const getUsersByTaskId = async (taskId: string): Promise<IUser[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${taskId}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users by task ID:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};
