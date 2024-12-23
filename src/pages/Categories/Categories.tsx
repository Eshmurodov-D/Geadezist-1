import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Page = () => {
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [formData, setFormData] = useState({
        tr: '',
        rasm: '',
        nomi: '',
        tavsif: '',
        umumiySavollar: '',
        qoshimchaSavollar: '',
        davomiylikVaqti: ''
    });
    const [rows, setRows] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            const updatedRows = rows.map((row, index) =>
                index === currentIndex ? formData : row
            );
            setRows(updatedRows);
            setEditMode(false);
        } else {
            setRows([...rows, formData]);
        }
        resetForm();
        setShowModal(false);
    };

    const handleEdit = (index) => {
        setFormData(rows[index]);
        setCurrentIndex(index);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        setCurrentIndex(index);
        setDeleteModal(true);
    };

    const confirmDelete = () => {
        setRows(rows.filter((_, index) => index !== currentIndex));
        setDeleteModal(false);
    };

    const resetForm = () => {
        setFormData({
            tr: '',
            rasm: '',
            nomi: '',
            tavsif: '',
            umumiySavollar: '',
            qoshimchaSavollar: '',
            davomiylikVaqti: ''
        });
    };

    return (
        <div>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Kategoriya</h1>
                    <button
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                        onClick={() => setShowModal(true)}
                    >
                        + Qo'shish
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">T/R</th>
                            <th className="px-4 py-2 text-left">Kategoriya Rasmi</th>
                            <th className="px-4 py-2 text-left">Kategoriya Nomi</th>
                            <th className="px-4 py-2 text-left">Tavsifi</th>
                            <th className="px-4 py-2 text-left">Umumiy Savollar</th>
                            <th className="px-4 py-2 text-left">Qo'shimcha Savollar</th>
                            <th className="px-4 py-2 text-left">Davomiylik Vaqti</th>
                            <th className="px-4 py-2 text-left">Harakatlar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => (
                            <tr className="border-t" key={index}>
                                <td className="px-4 py-2">{row.tr}</td>
                                <td className="px-4 py-2">{row.rasm}</td>
                                <td className="px-4 py-2">{row.nomi}</td>
                                <td className="px-4 py-2">{row.tavsif}</td>
                                <td className="px-4 py-2">{row.umumiySavollar}</td>
                                <td className="px-4 py-2">{row.qoshimchaSavollar}</td>
                                <td className="px-4 py-2">{row.davomiylikVaqti}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => handleEdit(index)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">
                                {editMode ? 'Kategoriyani Tahrirlash' : 'Kategoriya Qo\'shish'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {['tr', 'rasm', 'nomi', 'tavsif', 'umumiySavollar', 'qoshimchaSavollar', 'davomiylikVaqti'].map((field) => (
                                    <div key={field} className="mb-4">
                                        <label className="block text-sm font-medium mb-1">{field.split(/(?=[A-Z])/).join(' ')}</label>
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="w-full border rounded-lg p-2"
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-black py-2 px-4 rounded-lg mr-2"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Bekor qilish
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-black text-white py-2 px-4 rounded-lg"
                                    >
                                        Saqlash
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                {deleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Haqiqatan ham o‘chirishni xohlaysizmi?</h2>
                            <div className="flex justify-end">
                                <button
                                    className="bg-gray-300 text-black py-2 px-4 rounded-lg mr-2"
                                    onClick={() => setDeleteModal(false)}
                                >
                                    Yo'q
                                </button>
                                <button
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg"
                                    onClick={confirmDelete}
                                >
                                    Ha
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
