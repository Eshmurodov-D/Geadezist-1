import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { IoEyeSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// User type
interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  phumber: number;
  province: string;
  district: string;
  street: string;
  email: string;
}

// Define the provinces and districts
const provinces: { [key: string]: string[] | undefined } = {
  Toshkent: ["Chilonzor", "Yunusobod"],
  Samarqand: ["Oqdaryo", "Urgut"],
};

// Define the filter fields
const filterFields = [
  { key: "search", label: "Фойдаланувчи қидириш...", type: "text" },
  {
    key: "province",
    label: "Viloyat",
    type: "select",
    options: Object.keys(provinces),
  },
  { key: "district", label: "Туман", type: "select", options: [] },
];

const Users: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    search: "",
    province: "",
    district: "",
  });

  const tableData: User[] = [
    {
      id: 1,
      firstname: "Ibrohim",
      lastname: "Ahmedov",
      birthday: "25",
      phumber: 998909990990,
      email: "ibrohim001@gmail.com",
      province: "Toshkent",
      district: "Chilonzor",
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
      district: "Urgut",
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
      district: "Oqdaryo",
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
      district: "Yunusobod",
      street: "Navoi ko'chasi",
    },
  ];

  const filteredData = tableData.filter((user) => {
    const matchesSearch =
      user.firstname.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(filters.search.toLowerCase());

    const matchesProvince = filters.province
      ? user.province === filters.province
      : true;
    const matchesDistrict = filters.district
      ? user.district === filters.district
      : true;

    return matchesSearch && matchesProvince && matchesDistrict;
  });

  const tableColumns = [
    { key: "id", title: "ID" },
    { key: "firstname", title: "Исм" },
    { key: "lastname", title: "Фамилия" },
    { key: "email", title: "Электрон почта" },
    { key: "province", title: "Вилоят" },
    { key: "district", title: "district" },
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (key === "province") {
        newFilters.district = "";
      }
      return newFilters;
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl pt-10 font-semibold text-gray-700">Ходимлар</h1>
      </div>

      {/* Filter Fields */}
      <div className="flex items-center space-x-4 w-full mb-8">
        {filterFields.map((field) => (
          <div key={field.key} className="flex-1">
            {field.type === "text" ? (
              <input
                type="text"
                placeholder={field.label}
                value={filters[field.key]}
                onChange={(e) => handleFilterChange(field.key, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 h-[56px]"
              />
            ) : (
              <FormControl fullWidth>
  <InputLabel id={`${field.key}-select-label`}>
    {field.label}
  </InputLabel>
  <Select
    labelId={`${field.key}-select-label`}
    id={`${field.key}-select`}
    value={filters[field.key]}
    label={field.label}
    onChange={(e) =>
      handleFilterChange(field.key, e.target.value)
    }
    sx={{ height: "56px" }}
  >
    {(field.key === "district" && filters.province
      ? provinces[filters.province] || []
      : field.options || []
    ).map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            )}
          </div>
        ))}
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
              <span>{selectedUser.district}</span>
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
};

export default Users;
