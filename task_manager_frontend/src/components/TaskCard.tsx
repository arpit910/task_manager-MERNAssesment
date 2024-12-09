import React, { useState, useEffect } from "react";
import { ITask, IUser, IPriority } from "../types";
import { useModal } from "../hooks/useModal";
import UserList from "./UserList";
import { assignUserToTask, getUsersByTaskId } from "../services/taskService";

interface TaskCardProps {
  task: ITask;
  users: IUser[];
  priorities: IPriority[];
  onStatusChange: (taskId: string, newStatus: string) => void;
  onPriorityChange: (taskId: string, newPriorityId: string) => void;
  onAssignUser: (taskId: string, userId: string[]) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  users,
  priorities,
  onStatusChange,
  onPriorityChange,
  onAssignUser,
}) => {
  // Initialize state safely
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(
    task.priority || ""
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    task.status || "To Do"
  );

  const [assignedUser, setAssignedUser] = useState<IUser[]>();

  // Effect to handle priority changes when task data updates
  useEffect(() => {
    setSelectedPriority(task.priority || "");
    setSelectedStatus(task.status || "To Do");
    try {
      const getUsers = async () => {
        const users = await getUsersByTaskId(task._id);

        setAssignedUser(users);
      };
      getUsers();
    } catch (error) {}
  }, [task]);

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriorityId = e.target.value;
    setSelectedPriority(newPriorityId);
    onPriorityChange(task._id, newPriorityId);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    onStatusChange(task._id, newStatus);
  };

  // Safely get assigned users' names
  const assignedUsers = task.assignedTo.map((userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : "Unknown User";
  });

  const { ModalWrapper, closeModal, openModal } = useModal(
    <UserList
      onClose={() => closeModal()}
      taskId={task._id}
      onUsersAssigned={(users) => onAssignUser(task._id, users)}
    />
  );
  return (
    <>
      <ModalWrapper />
      <li className="p-3 bg-white rounded-md shadow-sm">
        <div className="font-semibold">{task.title}</div>
        <div className="text-sm text-gray-600">{task.description}</div>
        <div className="text-sm text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>

        <div className="mt-3">
          <div className="mb-2"></div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="mt-1 p-2 border rounded"
            >
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        {/* Task Action Buttons */}
        <div className="flex gap-2 mt-4">
          <ul className="list-disc pl-5">
            {assignedUser &&
              assignedUser.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  {/* <p>{JSON.stringify(user)}</p> */}
                  <button
                    // onClick={() => onRemoveUser(task._id, user._id)} // Remove user button
                    className="text-red-500 ml-2"
                  >
                    🗑️
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <button
          // onClick={() => onAssignUser(task._id, ["67540cda7fe385662f0fd106"])}
          onClick={() => {
            openModal();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </li>
    </>
  );
};

export default TaskCard;
