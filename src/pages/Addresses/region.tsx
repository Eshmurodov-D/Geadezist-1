  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { MdDelete, MdEdit } from "react-icons/md"; // Edit va Delete ikonkalari
  import Button from "../../components/Button"; // Button komponenti
  import Table from "../../components/Table/Table"//e komponenti
  import Modal from "../../components/modal"//l komponenti
  import { toast, ToastContainer } from "react-toastify"; // Toastify import qilish
  import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

  interface Region {
    id: number;
    name: string;
  }

  const Region: React.FC = () => {
    const [regionName, setRegionName] = useState<string>(""); // Region nomi
    const [regions, setRegions] = useState<Region[]>([]); // Backenddan olingan regionlar
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Region qo'shish uchun modal holati
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false); // Region o'chirish modalini ochish
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false); // Region tahrirlash modalini ochish
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null); // O'chiriladigan yoki tahrirlanadigan region
    const [editedRegionName, setEditedRegionName] = useState<string>(""); // Tahrirlanadigan regionning nomi
    const token = localStorage.getItem('token');

    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzQ2MjM1NjcsImV4cCI6MTczNDcwOTk2N30.ZAGQPF702MqpS1_kmjMsi5eU8xu6yUldWhDKjRrDT9BMofCNWZun7LGPDtJTDsP3H-esiBOlzyhtZWTdiBB7WQ"
    
    // Regionlarni backenddan olish
    const fetchRegions = async () => {
      try {
        const response = await axios.get("http://142.93.106.195:9090/region", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setRegions(response.data.body); 
        } else {
          toast.error("Regionlarni olishda xato yuz berdi");
        }
      } catch (err) {
        toast.error("Regionlarni olishda xato yuz berdi");
        console.error(err);
      }
    };

    const handleRegionSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      if (!regionName) {
        toast.warn("Iltimos, region nomini kiriting.");
        return;
      }

      try {
        const response = await axios.post(
          "http://142.93.106.195:9090/region",
          { name: regionName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Region muvaffaqiyatli qo'shildi");
          setRegionName(""); 
          setIsModalOpen(false); 
          fetchRegions();
        } else {
          toast.error("Region qo'shishda xato yuz berdi");
        }
      } catch (err) {
        toast.error("Region qo'shishda xato yuz berdi");
        console.error(err);
      }
    };

    const deleteRegion = async (id: number) => {
      try {
        const response = await axios.delete(
          `http://142.93.106.195:9090/region/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Region muvaffaqiyatli o'chirildi");
          fetchRegions();
        } else {
          toast.error("Regionni o'chirishda xato yuz berdi");
        }
      } catch (err) {
        toast.error("Regionni o'chirishda xato yuz berdi");
        console.error(err);
      }
    };

    const editRegion = async (id: number, name: string) => {
      try {
        const response = await axios.put(
          `http://142.93.106.195:9090/region/${id}`,
          { name: name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Region muvaffaqiyatli tahrirlandi");
          fetchRegions(); 
        } else {
          toast.error("Regionni tahrirlashda xato yuz berdi");
        }
      } catch (err) {
        toast.error("Regionni tahrirlashda xato yuz berdi");
        console.error(err);
      }
    };

    useEffect(() => {
      fetchRegions();
    }, []);

    const columns = [
      { key: "id", title: "ID" }, 
      { key: "name", title: "Region nomi" }, 
      {
        key: "action",
        title: "Action",
        render: (value: any, record: Region) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedRegion(record);
                setDeleteModalOpen(true); 
              }}
              className="text-gray-600 hover:text-red-800"
            >
              <MdDelete className="text-lg" />
            </button>

            <button
              onClick={() => {
                setSelectedRegion(record);
                setEditedRegionName(record.name); 
                setEditModalOpen(true); 
              }}
              className="text-gray-600  hover:text-yellow-600"
            >
              <MdEdit className="text-lg" />
            </button>
          </div>
        ),
      },
    ];

    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Add New Region</h1>

        {/* Region qo'shish tugmasi */}
        <Button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="bg-gray-600 flex justify-center font-semibold text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
         add Region
        </Button>

        {/* Regionlar jadvali */}
        <div className="mt-6">
          <Table
            data={regions} // Jadvalga regionlarni yuborish
            columns={columns} // Jadval ustunlari
            className="overflow-x-auto"
          />
        </div>

        {/* Region qo'shish modal */}
        <Modal
          isOpen={isModalOpen} // Modal holati
          onClose={() => setIsModalOpen(false)} // Modalni yopish
          title="Yangi Region Qo'shish"
        >
          <form onSubmit={handleRegionSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="regionName"
                className="block text-sm font-medium text-gray-700"
              >
                Region Name
              </label>
              <input
                type="text"
                id="regionName"
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
                placeholder="Region nomini kiriting"
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="danger"
                size="medium"
                type="submit"
                className="bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-md"
              >
                Qo'shish
              </Button>
            </div>
          </form>
        </Modal>

        {/* Regionni o'chirish modal */}
        <Modal
          isOpen={deleteModalOpen} // O'chirish modalini ochish
          onClose={() => setDeleteModalOpen(false)} // Modalni yopish
          title="Regionni o'chirish"
        >
          <div>
            <p>Ushbu regionni o'chirishni tasdiqlaysizmi?</p>
            {selectedRegion && (
              <div>
                <p className="font-semibold">{selectedRegion.name}</p>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => {
                      if (selectedRegion) {
                        deleteRegion(selectedRegion.id); // Regionni o'chirish
                      }
                      setDeleteModalOpen(false); // Modalni yopish
                    }}
                    className="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-md"
                  >
                    O'chirish
                  </Button>
                  <Button
                    onClick={() => setDeleteModalOpen(false)} // Modalni yopish
                    className="bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-md ml-2"
                  >
                    Yopish
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>

        {/* Regionni tahrirlash modal */}
        <Modal
          isOpen={editModalOpen} // Tahrir qilish modalini ochish
          onClose={() => setEditModalOpen(false)} // Modalni yopish
          title="Regionni tahrirlash"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedRegion) {
                editRegion(selectedRegion.id, editedRegionName); // Regionni tahrirlash
                setEditModalOpen(false); // Modalni yopish
              }
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="editedRegionName"
                className="block text-sm font-medium text-gray-700"
              >
                Region nomini tahrirlang
              </label>
              <input
                type="text"
                id="editedRegionName"
                value={editedRegionName}
                onChange={(e) => setEditedRegionName(e.target.value)}
                placeholder="Region nomini tahrirlang"
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant="danger"
                size="medium"
                type="submit"
                className="bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-md"
              >
                Tahrirlamoq
              </Button>
            </div>
          </form>
        </Modal>

        {/* ToastContainer */}
        <ToastContainer />
      </div>
    );
  };

  export default Region;
