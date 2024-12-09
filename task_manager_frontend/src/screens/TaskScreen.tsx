import React, { useEffect, useState } from "react";
import { users, priorities } from "../data/task";
import { ITask, IPriority } from "../types";
import {
  assignUserToTask,
  fetchTasksByPriority,
} from "../services/taskService";
import TaskCard from "../components/TaskCard";
import { useModal } from "../hooks/useModal";
import AddTaskCard from "../components/AddTaskCard";

const TaskScreen: React.FC = () => {
  const [tasksByPriority, setTasksByPriority] = useState<
    Record<string, ITask[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ModalWrapper, openModal, closeModal } = useModal(
    <AddTaskCard
      onSuccess={(task: ITask, priorityLevel: string) => {
        console.log("called cllback function");
        setTasksByPriority((prev) => ({
          ...prev, // Copy the existing priorities and tasks
          [priorityLevel]: [...(prev[priorityLevel] || []), task], // Add the new task to the appropriate bucket
        }));
        console.log(tasksByPriority);
        closeModal();
      }}
    />
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchTasksByPriority(priorities);
        setTasksByPriority(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Handle task assignment
  const handleAssignUser = (taskId: string, userIds: string[]) => {
    // Step 1: Update the local state with the new user assignments
    setTasksByPriority((prev) => {
      const updatedTasks = { ...prev };

      // Loop through each priority level to find the task and update the assignedTo list
      Object.keys(updatedTasks).forEach((priorityLevel) => {
        updatedTasks[priorityLevel] = updatedTasks[priorityLevel].map(
          (task) => {
            if (task._id === taskId) {
              // Add the user IDs to the task's assignedTo array, avoiding duplicates
              task.assignedTo = Array.from(
                new Set([...task.assignedTo, ...userIds])
              );
            }
            return task;
          }
        );
      });

      return updatedTasks;
    });
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    console.log(`Task ${taskId} status changed to: ${newStatus}`);
    // Here you would update the status in the state or call an API
  };

  const handlePriorityChange = (taskId: string, newPriorityId: string) => {
    console.log(`Task ${taskId} priority changed to: ${newPriorityId}`);
    // Here you would update the priority in the state or call an API
  };

  const handleRemoveUser = async (taskId: string, userId: string) => {
    try {
      // Call the service to remove the user from the task
      await removeUserFromTask(taskId, userId);

      // Update the tasksByPriority state after removing the user
      setTasksByPriority((prev) => {
        const updatedTasks = { ...prev };
        Object.keys(updatedTasks).forEach((priority) => {
          updatedTasks[priority] = updatedTasks[priority].map((task) => {
            if (task._id === taskId) {
              task.assignedTo = task.assignedTo.filter((id) => id !== userId); // Remove the user from the assignedTo list
            }
            return task;
          });
        });
        return updatedTasks;
      });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="task-screen flex justify-center items-start h-screen p-5">
      <ModalWrapper />
      <div className="buckets flex gap-8 w-full">
        {/* Map through priorities to create 3 buckets */}
        {priorities.map((priority: IPriority) => (
          <div
            key={priority._id}
            className={`bucket flex flex-col flex-1 max-h-screen p-5 rounded-lg shadow-lg overflow-y-auto ${
              priority.level === "Low"
                ? "bg-blue-100"
                : priority.level === "Medium"
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            <div className="flex justify-between m-2">
              <h2 className="text-center text-2xl font-semibold mb-4">
                {priority.level} Priority
              </h2>
              <button onClick={openModal} className="text-4xl">
                +
              </button>
            </div>
            <ul className="space-y-4">
              {/* Map through tasks of the current priority level */}
              {tasksByPriority[priority.level]?.map((task: ITask) => (
                <TaskCard
                  // key={task._id}
                  task={task}
                  users={users}
                  priorities={priorities}
                  onStatusChange={handleStatusChange}
                  onPriorityChange={handlePriorityChange}
                  onAssignUser={handleAssignUser}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskScreen;
