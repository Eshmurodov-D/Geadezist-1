import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; // Edit and Delete icons
import Button from "../../components/Button"; // Button component
import Table from "../../components/Table/Table"; // Table component
import Modal from "../../components/modal"; // Modal component
import { toast, ToastContainer } from "react-toastify"; // Toastify import
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

interface District {
  id: number;
  name: string;
  regionId: number;
  regionName: string;
}

interface Region {
  id: number;
  name: string;
}

const District: React.FC = () => {
  const [districtName, setDistrictName] = useState<string>(""); // District name
  const [districts, setDistricts] = useState<District[]>([]); // Districts fetched from backend
  const [regions, setRegions] = useState<Region[]>([]); // Regions fetched from backend
  const [selectedRegionId, setSelectedRegionId] = useState<number>(0); // Selected region ID
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal for adding a district
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false); // Modal for deleting a district
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false); // Modal for editing a district
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null); // Selected district for deletion or editing
  const [editedDistrictName, setEditedDistrictName] = useState<string>(""); // Name of the district being edited
  const token = localStorage.getItem("token");

  // Fetch districts and regions from the backend
  const fetchDistrictsAndRegions = async () => {
    try {
      const [districtResponse, regionResponse] = await Promise.all([
        axios.get("http://142.93.106.195:9090/district", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://142.93.106.195:9090/region", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (districtResponse.data.success) {
        setDistricts(districtResponse.data.body);
      } else {
        toast.error("Failed to fetch districts.");
      }

      if (regionResponse.data.success) {
        setRegions(regionResponse.data.body);
      } else {
        toast.error("Failed to fetch regions.");
      }
    } catch (err) {
      toast.error("Error fetching data.");
      console.error(err);
    }
  };

  // Submit a new district
  const handleDistrictSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!districtName || selectedRegionId === 0) {
      toast.warn("Please enter a district name and select a region.");
      return;
    }

    try {
      const response = await axios.post(
          "http://142.93.106.195:9090/district",
          { name: districtName, regionId: selectedRegionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (response.data.success) {
        toast.success("District added successfully.");
        setDistrictName("");
        setSelectedRegionId(0); // Reset region selection
        setIsModalOpen(false);
        fetchDistrictsAndRegions();
      } else {
        toast.error("Failed to add district.");
      }
    } catch (err) {
      toast.error("Error adding district.");
      console.error(err);
    }
  };

  // Delete a district
  const deleteDistrict = async (id: number) => {
    try {
      const response = await axios.delete(
          `http://142.93.106.195:9090/district/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (response.data.success) {
        toast.success("District successfully deleted.");
        fetchDistrictsAndRegions();
      } else {
        toast.error("Failed to delete district.");
      }
    } catch (err) {
      toast.error("Error deleting district.");
      console.error(err);
    }
  };

  // Edit a district
  const editDistrict = async (id: number, name: string, regionId: number) => {
    try {
      const response = await axios.put(
          `http://142.93.106.195:9090/district/${id}`,
          { name: name, regionId: regionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (response.data.success) {
        toast.success("District successfully updated.");
        fetchDistrictsAndRegions();
      } else {
        toast.error("Failed to update district.");
      }
    } catch (err) {
      toast.error("Error updating district.");
      console.error(err);
    }
  };

  // Fetch districts and regions on component mount
  useEffect(() => {
    fetchDistrictsAndRegions();
  }, []);

  // Table columns
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "District Name" },
    { key: "regionName", title: "Region Name" },
    {
      key: "action",
      title: "Actions",
      render: (value: any, record: District) => (
          <div className="flex items-center space-x-2">
            <button
                onClick={() => {
                  setSelectedDistrict(record);
                  setDeleteModalOpen(true); // Open delete modal
                }}
                className="text-gray-600 hover:text-red-800"
            >
              <AiOutlineDelete className="text-lg" />
            </button>

            <button
                onClick={() => {
                  setSelectedDistrict(record);
                  setEditedDistrictName(record.name);
                  setSelectedRegionId(record.regionId); // Set region ID for editing
                  setEditModalOpen(true); // Open edit modal
                }}
                className="text-gray-600 hover:text-yellow-600"
            >
              <AiOutlineEdit className="text-lg" />
            </button>
          </div>
      ),
    },
  ];

  return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Manage Districts</h1>

        {/* Button to open add district modal */}
        <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-600 flex justify-center font-semibold text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Add District
        </Button>

        {/* Table to display districts */}
        <div className="mt-6">
          <Table
              data={districts}
              columns={columns}
              className="overflow-x-auto"
          />
        </div>

        {/* Add District Modal */}
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New District"
        >
          <form onSubmit={handleDistrictSubmit} className="space-y-6">
            <div>
              <label htmlFor="districtName" className="block text-sm font-medium text-gray-700">
                District Name
              </label>
              <input
                  type="text"
                  id="districtName"
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  placeholder="Enter district name"
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">


              Select Region
              </label>
              <select
                  id="region"
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(Number(e.target.value))}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={0}>Select a Region</option>
                {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <Button
                  variant="danger"
                  size="medium"
                  type="submit"
                  className="bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-md"
              >
                Add
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete District Modal */}
        <Modal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete District"
        >
          <div>
            <p>Are you sure you want to delete this district?</p>
            {selectedDistrict && (
                <div>
                  <p className="font-semibold">{selectedDistrict.name}</p>
                  <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => {
                          if (selectedDistrict) {
                            deleteDistrict(selectedDistrict.id);
                          }
                          setDeleteModalOpen(false);
                        }}
                        className="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-md"
                    >
                      Delete
                    </Button>
                    <Button
                        onClick={() => setDeleteModalOpen(false)}
                        className="bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-md ml-2"
                    >
                      Close
                    </Button>
                  </div>
                </div>
            )}
          </div>
        </Modal>

        {/* Edit District Modal */}
        <Modal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit District"
        >
          <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedDistrict) {
                  editDistrict(selectedDistrict.id, editedDistrictName, selectedRegionId);
                  setEditModalOpen(false);
                }
              }}
              className="space-y-6"
          >
            <div>
              <label htmlFor="editedDistrictName" className="block text-sm font-medium text-gray-700">
                Edit District Name
              </label>
              <input
                  type="text"
                  id="editedDistrictName"
                  value={editedDistrictName}
                  onChange={(e) => setEditedDistrictName(e.target.value)}
                  placeholder="Edit district name"
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Select Region
              </label>
              <select
                  id="region"
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(Number(e.target.value))}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <Button
                  variant="danger"
                  size="medium"
                  type="submit"
                  className="bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-md"
              >
                Edit
              </Button>
            </div>
          </form>
        </Modal>

        {/* Toast Container for notifications */}
        <ToastContainer />
      </div>
  );
};

export default District;
