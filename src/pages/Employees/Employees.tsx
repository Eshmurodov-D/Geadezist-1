import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import Input from "../../components/input";

const Employees: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const tableData = [
    { id: 1, fullName: "John Doe", category: "Kategoriya 1", status: "Faol" },
    {
      id: 2,
      fullName: "Jane Smith",
      category: "Kategoriya 2",
      status: "Nofaol",
    },
    {
      id: 3,
      fullName: "Bob Johnson",
      category: "Kategoriya 3",
      status: "Kutilmoqda",
    },
  ];

  const tableColumns = [
    { key: "id", title: "ID" },
    { key: "fullName", title: "F.I.O" },
    { key: "category", title: "Kategoriya" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Amallar",
      render: (_, record) => (
        <Button
          variant="primary"
          size="small"
          onClick={() => {
            setSelectedUser(record);
            setIsModalOpen(true);
          }}
        >
          Ko'rish
        </Button>
      ),
    },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    category: "",
    status: "",
  });

  const categories = [
    { value: "category1", label: "Kategoriya 1" },
    { value: "category2", label: "Kategoriya 2" },
    { value: "category3", label: "Kategoriya 3" },
  ];

  const statuses = [
    { value: "active", label: "Faol" },
    { value: "inactive", label: "Nofaol" },
    { value: "pending", label: "Kutilmoqda" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setIsModalOpen(false);
  };
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Employees</h2>
      <p>Bu bo'limda Employees boshqarish mumkin.</p>
      <Table data={tableData} columns={tableColumns} className="mb-8" />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Foydalanuvchi ma'lumotlari"
      >
        {selectedUser && (
          <form onSubmit={handleSubmit}>
            <Input
              label="F.I.O"
              type="text"
              name="fullName"
              value={selectedUser.fullName}
              onChange={handleChange}
              placeholder="F.I.O kiriting"
            />

            <Input
              type="select"
              label="Kategoriya"
              name="category"
              value={selectedUser.category}
              onChange={handleChange}
              options={categories}
            />

            <Input
              type="select"
              label="Status"
              name="status"
              value={selectedUser.status}
              onChange={handleChange}
              options={statuses}
            />

            <div className="mt-4 flex justify-end">
              <Button type="submit" variant="primary">
                Saqlash
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Employees;
