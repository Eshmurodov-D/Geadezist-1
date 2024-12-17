import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import Input from "../../components/input";

<<<<<<< HEAD
interface Employee {
  id: number;
  fullName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  role: string; // Toifa
  isActive: boolean;
}

const Employees: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  // JSON-serverdan ma'lumot olish
  useEffect(() => {
    fetch("http://localhost:3000/user-info")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        // LocalStorage'ga yozish
        localStorage.setItem("employees", JSON.stringify(data));
      })
      .catch((err) => console.error("Ma'lumotni olishda xato:", err));
  }, []);

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
    if (formData.password !== formData.confirmPassword) {
      alert("Parollar bir-biriga mos emas!");
      return;
    }

    // Lavozimni role qiymatiga qarab aniqlash
    const position =
      formData.role === "superadmin" ? "Тестер админ" : "Текширувчи админ";

    const newEmployee: Employee = {
      id: employees.length + 1,
      fullName: formData.fullName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      position: position,
      role: formData.role,
      isActive: true,
    };

    // Ma'lumotni serverga yuborish
    fetch("http://localhost:3000/user-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => res.json())
      .then((data) => {
        // Foydalanuvchilarni yangilash va localStorage'ga yozish
        const updatedEmployees = [...employees, data];
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      })
      .catch((err) => console.error("Ma'lumotni saqlashda xato:", err));

    setIsModalOpen(false);

    // Formni tozalash
    setFormData({
      fullName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      role: "",
      password: "",
      confirmPassword: "",
    });
  };

  const toggleActive = (id: number) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, isActive: !employee.isActive }
        : employee
    );

    // Ma'lumotni yangilash
    const updatedEmployee = updatedEmployees.find((emp) => emp.id === id);

    if (updatedEmployee) {
      fetch(`http://localhost:3000/user-info/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      })
        .then((res) => res.json())
        .then(() => {
          setEmployees(updatedEmployees);
          localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        })
        .catch((err) => console.error("Faol holatini o'zgartirishda xato:", err));
    }
  };

  const tableColumns = [
    { key: "id", title: "T/P" },
    { key: "fullName", title: "Исм" },
    { key: "lastName", title: "Фамилия" },
    { key: "email", title: "Электрон почта" },
    { key: "position", title: "Лавозими" },
    {
      key: "isActive",
      title: "Активлиги",
      render: (row: Employee) => (
        <Button
          variant={row.isActive ? "success" : "danger"}
          size="small"
          onClick={() => toggleActive(row.id)}
        >
          {row.isActive ? "Faol" : "Nofaol"}
=======


import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button";
import  Modal  from "../../components/modal";
import  Input  from "../../components/input";

const Employees: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const tableData = [
    { id: 1, fullName: 'John Doe', category: 'Kategoriya 1', status: 'Faol' },
    { id: 2, fullName: 'Jane Smith', category: 'Kategoriya 2', status: 'Nofaol' },
    { id: 3, fullName: 'Bob Johnson', category: 'Kategoriya 3', status: 'Kutilmoqda' },
  ];

  const tableColumns = [
    { key: 'id', title: 'ID' },
    { key: 'fullName', title: 'F.I.O' },
    { key: 'category', title: 'Kategoriya' },
    { key: 'status', title: 'Status' },
    {
      key: 'actions',
      title: 'Amallar',
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
>>>>>>> 974f70f03c046c65d83889f4e6f5cd1e7a03e8ff
        </Button>
      ),
    },
  ];

<<<<<<< HEAD
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Ходимлар</h2>

      {/* Modal ochish tugmasi */}
      <Button
        variant="primary"
        className="my-3"
        onClick={() => {
          setIsModalOpen(true);
          setFormData({
            fullName: "",
            lastName: "",
            email: "",
            phone: "",
            position: "",
            role: "",
            password: "",
            confirmPassword: "",
          });
        }}
      >
        Қўшиш
      </Button>

      {/* Hodimlar jadvali */}
      <Table data={employees} columns={tableColumns} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Янги Ходим"
      >
        <form onSubmit={handleSubmit}>
          {/* Toifa tanlash */}
          <div className="mb-4">
            <label className="block text-gray-700">Админ тоифасини танланг</label>
            <select
              name="role"
              className="w-full border border-gray-300 rounded p-2"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="">Тоифани танланг</option>
              <option value="superadmin">Тестер Админ</option>
              <option value="admin">Текширувчи Админ</option>
            </select>
          </div>

          {/* Ism */}
          <Input
            label="Исм"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Исмни киритинг"
          />

          {/* Familiya */}
          <Input
            label="Фамилия"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Фамилия киритинг"
          />

          {/* Telefon raqam */}
          <Input
            label="Телефон рақам"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Телефон рақамни киритинг"
          />

          {/* Elektron pochta */}
          <Input
            label="Электрон почта"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Электрон почтани киритинг"
          />

          {/* Parol */}
          <Input
            label="Парол"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Паролни киритинг"
          />

          {/* Parolni takrorlash */}
          <Input
            label="Паролни такрорланг"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Такрорий паролни киритинг"
          />

          {/* Saqlash tugmasi */}
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="primary">
              Сақлаш
            </Button>
          </div>
        </form>
=======
  const [formData, setFormData] = useState({
    fullName: '',
    category: '',
    status: ''
  });

  const categories = [
    { value: 'category1', label: 'Kategoriya 1' },
    { value: 'category2', label: 'Kategoriya 2' },
    { value: 'category3', label: 'Kategoriya 3' },
  ];

  const statuses = [
    { value: 'active', label: 'Faol' },
    { value: 'inactive', label: 'Nofaol' },
    { value: 'pending', label: 'Kutilmoqda' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
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
>>>>>>> 974f70f03c046c65d83889f4e6f5cd1e7a03e8ff
      </Modal>
    </div>
  );
};

export default Employees;
