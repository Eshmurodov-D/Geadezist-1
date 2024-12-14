import { useState } from "react";
import { FaEye } from "react-icons/fa";

export default function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "ibrohim",
      surname: "krisa",
      email: "ibrohimkrisa001@gmail.com",
      details: "Additional information about ibrohim.",
    },
    // Add more users here
  ];

  const openModal = (user:any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl pt-10 font-semibold text-gray-700">
            Ходимлар
          </h1>
        </div>
        <div className="flex items-center space-x-4 w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Фойдаланувчи қидириш..."
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
            />
          </div>
          <div className="flex-1">
            <select className="w-full p-2 border border-gray-300 rounded-lg text-gray-700">
              <option value="">Вилоятни танланг</option>
              {/* Add options here */}
            </select>
          </div>
          <div className="flex-1">
            <select className="w-full p-2 border border-gray-300 rounded-lg text-gray-700">
              <option value="">Туманни танланг</option>
              {/* Add options here */}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm font-semibold">
                <th className="px-4 py-3 text-left">Т/Р</th>
                <th className="px-4 py-3 text-left">Исм</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Фамилия
                </th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  Электрон почта
                </th>
                <th className="px-4 py-3 text-center">Харакат</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {user.surname}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => openModal(user)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <p>
              <strong>Name:</strong> {selectedUser}
            </p>
            <p>
              <strong>Surname:</strong> {selectedUser}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser}
            </p>
            <p>
              <strong>Details:</strong> {selectedUser}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
