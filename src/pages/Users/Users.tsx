
import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { IoEyeSharp } from "react-icons/io5";

// Foydalanuvchi tipi
interface User {
  id: number;
  firstname: string;
  birtday:string;
  phumber: number;
  province:string
  provincee:string
  street:string
  email: string;
}

const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const tableData: User[] = [
    { id: 1, firstname: "Kategoriya 1", birtday:"-",phumber: 998909990990, email: "Faol", province:"-", provincee:"-", street:"-" },
    { id: 1, firstname: "Kategoriya 1", birtday:"-",phumber: 998909990990, email: "Faol", province:"-", provincee:"-",street:"-" },
    { id: 1, firstname: "Kategoriya 1", birtday:"-",phumber: 998909990990, email: "Faol", province:"-", provincee:"-", street:"-" },
  ];

  const tableColumns = [
    { key: "id", title: "ID" },
    { key: "fullName", title: "Исм" },
    { key: "category", title: "Фамилия" },
    { key: "status", title: "Электрон почта" },
    {
      key: "actions",
      title: "Харакат",
      render: (text: string, record: User) => (
        <Button
          variant="secondary"
          size="medium"
          onClick={() => handleOpenModal(record)}
        >
          <IoEyeSharp />
        </Button>
      ),
    },
  ];

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl pt-10 font-semibold text-gray-700">Ходимлар</h1>
      </div>

      {/* Top 3 Input Fields */}
      <div className="flex items-center space-x-4 w-full mb-8">
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
            <option value="Toshkent">Тошкент</option>
            <option value="Samarqand">Самарқанд</option>
          </select>
        </div>
        <div className="flex-1">
          <select className="w-full p-2 border border-gray-300 rounded-lg text-gray-700">
            <option value="">Туманни танланг</option>
            <option value="Chilonzor">Чилонзор</option>
            <option value="Yunusobod">Юнусобод</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table data={tableData} columns={tableColumns} className="mb-8" />

{/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Foydalanuvchi ma'lumotlari"
      >
        {selectedUser && (
          <div className="">
            <p className="mb-4 flex justify-between pr-5">
              <strong> Tuliq Ismi: </strong> {selectedUser.firstname}
            </p>
            <p className="mb-4 flex justify-between pr-5">
              <strong>Tug'ilgan kuni: </strong> {selectedUser.birtday}
            </p>
            <p className="mb-4 flex justify-between pr-5">
              <strong>Telefon Raqami: </strong> {selectedUser.phumber}
            </p>
            <p className="mb-4 flex justify-between pr-5">
              <strong>Elektron pochtasi: </strong> {selectedUser.email}
            </p>
            <p className="mb-4 flex justify-between pr-5">
              <strong>Viloyati: </strong> {selectedUser.province}
            </p>
            <p className="mb-4 flex justify-between pr-5">
              <strong>Tumani: </strong> {selectedUser.provincee}
            </p>
            <p className="mb-4 flex justify-between pr-5">
              <strong>Ko'chasi: </strong> {selectedUser.street}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Users;