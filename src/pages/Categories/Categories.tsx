// React imports
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import Input from "../../components/input";
import { PiPlusCircleLight } from "react-icons/pi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  extraQuestionCount: number;
  durationTime: number;
  retakeDate: number;
  fileId: string | null;
  main: boolean;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: string | null;
  deleted: boolean;
}

const Categories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    questionCount: 0,
    extraQuestionCount: 0,
    durationTime: 0,
    retakeDate: 0,
    fileId: 0,
    main: false,
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Категория номи киритилиши шарт!");
      return false;
    }
    if (!formData.description.trim()) {
      alert("Тавсиф киритилиши шарт!");
      return false;
    }
    if (formData.questionCount <= 0) {
      alert("Саволлар сони 0 дан катта бўлиши шарт!");
      return false;
    }
    if (formData.durationTime <= 0) {
      alert("Давомийлик вақти 0 дан катта бўлиши шарт!");
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get("http://142.93.106.195:9090/category/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.success) {
          setCategories(response.data.body || []);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      questionCount: category.questionCount,
      extraQuestionCount: category.extraQuestionCount,
      durationTime: category.durationTime,
      retakeDate: category.retakeDate,
      fileId: category.fileId || 0,
      main: category.main,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");

    if (editCategory) {
      try {
        const response = await axios.put(
          `http://142.93.106.195:9090/category/${editCategory.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success) {
          alert("Category updated successfully!");
          fetchCategories();
          handleCloseModal();
        } else {
          alert("Failed to update category.");
        }
      } catch (error) {
        console.error("Error updating category: ", error);
        alert("Error updating category.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://142.93.106.195:9090/category",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success) {
          alert("Category created successfully!");
          fetchCategories();
          handleCloseModal();
        } else {
          alert("Failed to create category.");
        }
      } catch (error) {
        console.error("Error creating category: ", error);
        alert("Error creating category.");
      }
    }
  };

  const handleCloseModal = () => {
    setFormData({
      name: "",
      description: "",
      questionCount: 0,
      extraQuestionCount: 0,
      durationTime: 0,
      retakeDate: 0,
      fileId: 0,
      main: false,
    });
    setEditCategory(null);
    setIsModalOpen(false);
  };

  const handleDelete = (categoryId: number) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://142.93.106.195:9090/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.success) {
          alert("Category deleted successfully!");
          fetchCategories();
        } else {
          alert("Failed to delete category.");
        }
      })
      .catch((error) => {
        console.error("Error deleting category: ", error);
        alert("Error deleting category.");
      });
  };

  return (
    <div className="max-w-full md:max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Категория
        </h1>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          <span className="font-medium text-gray-700">
            <Link to="/dashboard">Бошқарув панели</Link>
          </span>{" "}
          / <span className="text-blue-600 font-medium">Категория</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="secondary"
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
          <span>Кушиш</span>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-600 rounded-full"></div>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Т/П</th>
                <th className="px-6 py-3">Категория номи</th>
                <th className="px-6 py-3">Тавсиф</th>
                <th className="px-6 py-3">Саволлар сони</th>
                <th className="px-6 py-3">Қўшимча саволлар</th>
                <th className="px-6 py-3">Давомийлик (дақиқа)</th>
                <th className="px-6 py-3">Қайта қабул қилиш</th>
                <th className="px-6 py-3">Яратган</th>
                <th className="px-6 py-3">Асосий</th>
                <th className="px-6 py-3">Ҳаракат</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{category.id}</td>
                  <td className="px-6 py-4">{category.name}</td>
                  <td className="px-6 py-4">{category.description}</td>
                  <td className="px-6 py-4">{category.questionCount}</td>
                  <td className="px-6 py-4">{category.extraQuestionCount}</td>
                  <td className="px-6 py-4">{category.durationTime}</td>
                  <td className="px-6 py-4">{category.retakeDate}</td>
                  <td className="px-6 py-4">{category.createdBy}</td>
                  <td className="px-6 py-4">{category.fileId}</td>
                  <td className="px-6 py-4">{category.main ? "Ҳа" : "Йўқ"}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(category)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editCategory ? "Категорияни Таҳрирлаш" : "Категория Қўшиш"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Категория номи"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Категория номини киритинг"
          />
          <Input
            label="Тавсиф"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Тавсиф киритинг"
          />
          <Input
            label="Саволлар сони"
            type="number"
            name="questionCount"
            value={formData.questionCount}
            onChange={handleInputChange}
            placeholder="Саволлар сонини киритинг"
          />
          <Input
            label="Қўшимча саволлар сони"
            type="number"
            name="extraQuestionCount"
            value={formData.extraQuestionCount}
            onChange={handleInputChange}
            placeholder="Қўшимча саволлар сонини киритинг"
          />
          <Input
            label="Давомийлик вақти (дақиқа)"
            type="number"
            name="durationTime"
            value={formData.durationTime}
            onChange={handleInputChange}
            placeholder="Давомийлик вақтини киритинг"
          />
          <Input
            label="Қайта қабул қилиш"
            type="number"
            name="retakeDate"
            value={formData.retakeDate}
            onChange={handleInputChange}
            placeholder="Қайта қабул қилишни киритинг"
          />
          <div className="flex gap-4 justify-end mt-4">
            <Button type="submit">{editCategory ? "Сақлаш" : "Қўшиш"}</Button>
            <Button onClick={handleCloseModal}>Ёпиш</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
