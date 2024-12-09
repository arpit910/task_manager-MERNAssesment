// import React, { useEffect, useState } from "react";
// import { IUser } from "../types";

// interface AssignUserModalProps {
//   taskId: string;
//   onClose: () => void;
//   onAssign: (assignedUsers: string[]) => void;
// }

// const AssignUserModal: React.FC<AssignUserModalProps> = ({
//   taskId,
//   onClose,
//   onAssign,
// }) => {
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

//   // Fetch users from the backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersData = await getUsers();
//         setUsers(usersData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSelectUser = (userId: string) => {
//     setSelectedUsers((prevSelected) =>
//       prevSelected.includes(userId)
//         ? prevSelected.filter((id) => id !== userId)
//         : [...prevSelected, userId]
//     );
//   };

//   const handleAssign = () => {
//     onAssign(selectedUsers);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-5 rounded-lg w-1/3">
//         <h2 className="text-xl font-bold mb-4">Assign Users to Task</h2>
//         <div>
//           {users.map((user) => (
//             <div key={user._id} className="flex items-center mb-2">
//               <input
//                 type="checkbox"
//                 id={user._id}
//                 value={user._id}
//                 onChange={() => handleSelectUser(user._id)}
//               />
//               <label htmlFor={user._id} className="ml-2">
//                 {user.name}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-between">
//           <button
//             onClick={onClose}
//             className="bg-gray-300 px-4 py-2 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleAssign}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Assign Users
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignUserModal;
