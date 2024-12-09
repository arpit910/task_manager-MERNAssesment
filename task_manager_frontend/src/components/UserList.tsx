import React, { useState, useEffect } from "react";

import { assignUserToTask, getUsers } from "../services/taskService";
import { IUser } from "../types";

interface AssignUsersProps {
  taskId: string;
  onClose: () => void;
  onUsersAssigned: (userIds: string[]) => void; // Callback to update state after assignment
}

const AssignUsers: React.FC<AssignUsersProps> = ({
  taskId,
  onClose,
  onUsersAssigned,
}) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // Remove if already selected
          : [...prev, userId] // Add if not already selected
    );
  };

  const handleAssign = async () => {
    try {
      await assignUserToTask(taskId, selectedUserIds); // Assign each selected user
      onUsersAssigned(selectedUserIds); // Update parent state
      onClose(); // Close modal or component
    } catch (error) {
      console.error("Failed to assign users:", error);
    }
  };

  return (
    <div className="assign-users p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Assign Users</h2>
      <ul className="space-y-2">
        {/* <p>{JSON.stringify(users)}</p> */}
        {users &&
          users?.data?.map((user) => (
            <li key={user._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`user-${user._id}`}
                checked={selectedUserIds.includes(user._id)}
                onChange={() => handleCheckboxChange(user._id)}
                className="w-4 h-4"
              />
              <label htmlFor={`user-${user._id}`} className="text-gray-700">
                {user.name}
              </label>
            </li>
          ))}
      </ul>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignUsers;
