import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import Input from "../../components/input";
import { PiPlusCircleLight } from "react-icons/pi";

const Categories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    category: "",
    status: "",
  });

  const [tableData, setTableData] = useState([
    { id: 1, fullName: "John Doe", category: "Kategoriya 1", status: "Faol" },
    { id: 2, fullName: "Jane Smith", category: "Kategoriya 2", status: "Nofaol" },
    { id: 3, fullName: "Bob Johnson", category: "Kategoriya 3", status: "Kutilmoqda" },
  ]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTableData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        fullName: formData.fullName,
        category: categories.find((cat) => cat.value === formData.category)?.label || "",
        status: statuses.find((stat) => stat.value === formData.status)?.label || "",
      },
    ]);

    setIsModalOpen(false);
    setFormData({ fullName: "", category: "", status: "" });
  };

  const tableColumns = [
    { key: "id", title: "T/P" },
    { key: "fullName", title: "Категория расми" },
    { key: "category", title: "Категория номи" },
    { key: "status", title: "Тавсифи" },
    { key: "status", title: "Саволлар сони" },
    { key: "status", title: "Қўшимча сав." },
    { key: "status", title: "Давомийлик вақт..." },
    { key: "status", title: "Қайта қабул қил..." },
    { key: "status", title: "Яратган" },
    { key: "status", title: "Категория ҳолат..." },
    { key: "status", title: "Ўчирган" },
    { key: "status", title: "Ҳаракат" },
  ];

  return (
    <div className="max-w-full md:max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Категория</h1>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          <span className="font-medium text-gray-700">Бошқарув панели</span> /{" "}
          <span className="text-blue-600 font-medium">Категория</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="medium"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textTransform: "none",
          }}
        >
          <span className="icon text-2xl">
            <PiPlusCircleLight />
          </span>
          <span>kushish</span>
        </Button>
      </div>

      <Table data={tableData} columns={tableColumns} className="mb-8" />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Foydalanuvchi ma'lumotlari">
        <form onSubmit={handleSubmit}>
          <Input
            label="Rasm yuklash"
            type="file"
            name="image"
          />
          <Input
            label="F.I.O"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="F.I.O kiriting"
          />
          <Input
            type="select"
            label="Kategoriya"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
          />
          <Input
            type="select"
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statuses}
          />

          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="primary">
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
