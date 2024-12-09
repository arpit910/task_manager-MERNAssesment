import React, { useState, useEffect } from "react";
import { getUsers } from "../services/taskService"; // Service function to fetch users
import { createTask } from "../services/taskService"; // Service function to create a task
import { ITask } from "../types"; // Type for the task input
import { priorities } from "../data/task";
import { priorityData } from "../data/priority";

interface TaskFormInterface {
  onSuccess: (task: ITask, priorityLevel: string) => void;
}
const TaskForm: React.FC<TaskFormInterface> = ({ onSuccess }) => {
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [formData, setFormData] = useState<ITask>({
    title: "",
    description: "",
    status: "To Do",
    priority: "",
    assignedTo: [],
    dueDate: "",
  });

  const fetchUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      assignedTo: selectedOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(formData);
      alert("Task created successfully!");
      //   console.log(
      //     priorityData,
      //     priorityData[formData.priority],
      //     priorityData[formData.priority].level
      //   );
      onSuccess(formData, priorityData[formData.priority].level);
      setFormData({
        title: "",
        description: "",
        status: "To Do",
        priority: "",
        assignedTo: [],
        dueDate: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <form
      className="task-form max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold">Create a New Task</h2>
      <div className="form-group">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="form-group">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter task description"
        ></textarea>
      </div>
      <div className="form-group">
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="To Do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="form-group">
        <label className="block mb-1 font-medium">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="" disabled>
            Select priority
          </option>
          {priorities.map((priority) => (
            <option key={priority._id} value={priority._id}>
              {priority.level}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="block mb-1 font-medium">Assign Users</label>
        {/* <select
          multiple
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleUserSelection}
          className="w-full px-3 py-2 border rounded-md"
        >
          {users &&
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
        </select> */}
        <p className="text-sm text-gray-500 mt-1">
          Hold CTRL/Command to select multiple users.
        </p>
      </div>
      <div className="form-group">
        <label className="block mb-1 font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
