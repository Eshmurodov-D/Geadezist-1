import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { IoEyeSharp } from "react-icons/io5";

// User type
interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  phumber: number;
  province: string;
  provincee: string;
  street: string;
  email: string;
}

const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const viloyat = {
    Тошкент: "Тошкент",
    Самарқанд: "Самарқанд",
  };
  const tuman = {
    chilonzor: "toshknet",
    yunsobod: "Самарқанд",
  };
  const tableData: User[] = [
    {
      id: 1,
      firstname: "Ibrohim",
      lastname: "Ahmedov",
      birthday: "25",
      phumber: 998909990990,
      email: "ibrohim001@gmail.com",
      province: "Toshkent",
      provincee: "Chilonzor",
      street: "Amir Temur ko'chasi",
    },
    {
      id: 2,
      firstname: "Amir",
      lastname: "Normurodov",
      birthday: "20",
      phumber: 998909990990,
      email: "amir238@gmail.com",
      province: "Samarqand",
      provincee: "Yunusobod",
      street: "Gagarin ko'chasi",
    },
    {
      id: 3,
      firstname: "Boxodir",
      lastname: "Ernazarov",
      birthday: "11",
      phumber: 998909990990,
      email: "boxodir110@gmail.com",
      province: "Samarqand",
      provincee: "Chilonzor",
      street: "Beruniy ko'chasi",
    },
    {
      id: 4,
      firstname: "Dilshod",
      lastname: "Eshmurodov",
      birthday: "31",
      phumber: 998909990990,
      email: "dilshod220@gmail.com",
      province: "Toshkent",
      provincee: "Yunusobod",
      street: "Navoi ko'chasi",
    },
  ];

  const filteredData = tableData.filter((user) => {
    const matchesSearchTerm =
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince = selectedProvince
      ? user.province === selectedProvince
      : true;

    const matchesDistrict = selectedDistrict
      ? user.provincee === selectedDistrict
      : true;

    return matchesSearchTerm && matchesProvince && matchesDistrict;
  });

  const tableColumns = [
    { key: "id", title: "ID" },
    { key: "firstname", title: "Исм" },
    { key: "lastname", title: "Фамилия" },
    { key: "email", title: "Электрон почта" },
    { key: "province", title: "Вилоят" },
    { key: "provincee", title: "Туман" },
    {
      key: "actions",
      title: "Харакат",
      render: (_: string, record: User) => (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          />
        </div>

        <div className="flex-1">
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Вилоятни танланг</option>
            <option value="Toshkent">{viloyat.Тошкент}</option>
            <option value="Samarqand">{viloyat.Самарқанд}</option>
          </select>
        </div>

        <div className="flex-1">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <option value="">Туманни танланг</option>
            <option value="Chilonzor">{tuman.chilonzor}</option>
            <option value="Yunusobod">{tuman.yunsobod}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table data={filteredData} columns={tableColumns} className="mb-8" />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Foydalanuvchi ma'lumotlari"
      >
        {selectedUser && (
          <div>
            <p className="mb-4 flex justify-between">
              <strong>To'liq Ismi:</strong>
              <span>{`${selectedUser.firstname} ${selectedUser.lastname}`}</span>
            </p>
            <p className="mb-4 flex justify-between">
              <strong>Tug'ilgan kuni:</strong>
              <span>{selectedUser.birthday}</span>
            </p>
            <p className="mb-4 flex justify-between">
              <strong>Telefon Raqami:</strong>
              <span>{selectedUser.phumber}</span>
            </p>
            <p className="mb-4 flex justify-between">
              <strong>Elektron pochtasi:</strong>
              <span>{selectedUser.email}</span>
            </p>
            <p className="mb-4 flex justify-between">
              <strong>Viloyati:</strong>
              <span>{selectedUser.province}</span>
            </p>
            <p className="mb-4 flex justify-between">
              <strong>Tumani:</strong>
              <span>{selectedUser.provincee}</span>
            </p>
            <p className="mb-4 flex justify-between">
              <strong>Ko'chasi:</strong>
              <span>{selectedUser.street}</span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
export default Users
