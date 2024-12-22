import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'http://142.93.106.195:9090';

interface Option {
	text: string;
	file: File | null;
	isCorrect: boolean;
}

interface QuestionData {
	question: string;
	category: string;
	difficulty: string;
	type: string;
	options: Option[];
	image: File | null;
}

const QuestionTable = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [showImage, setShowImage] = useState<boolean>(false);
	const [formData, setFormData] = useState<QuestionData>({
		question: '',
		category: '',
		difficulty: '',
		type: '',
		options: [{ text: '', file: null, isCorrect: false }],
		image: null,
	});
	const [tableData, setTableData] = useState<QuestionData[]>([]);
	const [currentImage, setCurrentImage] = useState<File | null>(null);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

	// Fetch data from Swagger API endpoint
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await fetch(`${apiUrl}/question-controller/questions`);
				const data: QuestionData[] = await response.json();
				setTableData(data);
			} catch (error) {
				toast.error('Error fetching data');
			}
		};

		fetchQuestions();
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
		setEditIndex(null);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setFormData({
			question: '',
			category: '',
			difficulty: '',
			type: '',
			options: [{ text: '', file: null, isCorrect: false }],
			image: null,
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, image: e.target.files?.[0] || null });
	};

	const handleOptionChange = (index: number, field: string, value: any) => {
		const updatedOptions = [...formData.options];
		updatedOptions[index] = { ...updatedOptions[index], [field]: value };

		if (field === 'isCorrect') {
			updatedOptions.forEach((option, idx) => {
				if (idx !== index) option.isCorrect = false;
			});
		}

		setFormData({ ...formData, options: updatedOptions });
	};

	const addOption = () => {
		setFormData({ ...formData, options: [...formData.options, { text: '', file: null, isCorrect: false }] });
	};

	const saveData = () => {
		if (
			formData.question &&
			formData.category &&
			formData.difficulty &&
			formData.type &&
			formData.options.every((option) => option.text)
		) {
			if (editIndex !== null) {
				const updatedTableData = [...tableData];
				updatedTableData[editIndex] = formData;
				setTableData(updatedTableData);
			} else {
				setTableData([...tableData, formData]);
			}
			toast.success('Savol muvaffaqiyatli saqlandi!');
			closeModal();
		} else {
			toast.error('Iltimos, barcha maydonlarni to‘ldiring!');
		}
	};

	const handleImageClick = (image: File) => {
		setCurrentImage(image);
		setShowImage(true);
	};

	const closeImageModal = () => {
		setShowImage(false);
	};

	const openDeleteModal = (index: number) => {
		setDeleteIndex(index);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setDeleteIndex(null);
	};

	const deleteQuestion = () => {
		const updatedTableData = [...tableData];
		updatedTableData.splice(deleteIndex!, 1); // Using `!` to assert the non-null value
		setTableData(updatedTableData);
		toast.success('Savol muvaffaqiyatli o‘chirildi!');
		closeDeleteModal();
	};

	const openEditModal = (index: number) => {
		setEditIndex(index);
		setFormData(tableData[index]);
		setIsModalOpen(true);
	};

	return (
		<div className="container mx-auto p-4">
			<button
				onClick={openModal}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Savol qo'shish
			</button>

			{/* Jadval */}
			<table className="table-auto w-full mt-4 border border-gray-200">
				<thead>
				<tr className="bg-gray-100">
					<th className="border px-4 py-2">Savol</th>
					<th className="border px-4 py-2">Kategoriya</th>
					<th className="border px-4 py-2">Qiyinchilik</th>
					<th className="border px-4 py-2">Turi</th>
					<th className="border px-4 py-2">Rasm</th>
					<th className="border px-4 py-2">Uzgartirishlar</th>
				</tr>
				</thead>
				<tbody>
				{tableData.map((data, index) => (
					<tr key={index} className="hover:bg-gray-50">
						<td className="border px-4 py-2">{data.question}</td>
						<td className="border px-4 py-2">{data.category}</td>
						<td className="border px-4 py-2">{data.difficulty}</td>
						<td className="border px-4 py-2">{data.type}</td>
						<td className="border px-4 py-2">
							{data.image ? (
								<img
									src={URL.createObjectURL(data.image)}
									alt="Uploaded"
									className="h-12 w-12 object-cover rounded cursor-pointer"
									onClick={() => handleImageClick(data.image)}
								/>
							) : (
								'Rasm yo‘q'
							)}
						</td>
						<td className="border px-4 py-2 flex justify-center items-center space-x-2">
							<FaEdit
								className="cursor-pointer text-gray-600 hover:text-blue-500"
								onClick={() => openEditModal(index)} // Open edit modal
							/>
							<FaTrashAlt
								className="cursor-pointer text-gray-600 hover:text-red-500"
								onClick={() => openDeleteModal(index)} // Open delete confirmation modal
							/>
						</td>
					</tr>
				))}
				</tbody>
			</table>

			{/* Modal for adding/editing question */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
					<div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
						<h2 className="text-lg font-bold mb-4">{editIndex !== null ? 'Savolni tahrirlash' : 'Savol qo\'shish'}</h2>
						<input
							type="text"
							name="question"
							placeholder="Savolni kiriting"
							value={formData.question}
							onChange={handleInputChange}
							className="border w-full p-2 mb-3 rounded"
						/>
						<select
							name="category"
							value={formData.category}
							onChange={handleInputChange}
							className="border w-full p-2 mb-3 rounded"
						>
							<option value="">Kategoriyani tanlang</option>
							<option value="Matematika">Matematika</option>
							<option value="Ingliz tili">Ingliz tili</option>
							<option value="Fizika">Fizika</option>
						</select>
						<select
							name="difficulty"
							value={formData.difficulty}
							onChange={handleInputChange}
							className="border w-full p-2 mb-3 rounded"
						>
							<option value="">Qiyinchilik darajasini tanlang</option>
							<option value="Oson">Oson</option>
							<option value="O'rta">O'rta</option>
							<option value="Qiyin">Qiyin</option>
						</select>
						<select
							name="type"
							value={formData.type}
							onChange={handleInputChange}
							className="border w-full p-2 mb-3 rounded"
						>
							<option value="">Turlarni tanlang</option>
							<option value="Yopiq">Yopiq</option>
							<option value="Ochiq">Ochiq</option>
						</select>
						<input
							type="file"
							onChange={handleFileChange}
							className="border w-full p-2 mb-3 rounded"
						/>
						{formData.options.map((option, index) => (
							<div key={index} className="flex items-center mb-2">
								<input
									type="checkbox"
									checked={option.isCorrect}
									onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
									className="mr-2"
								/>
								<input
									type="text"
									placeholder={`Option ${index + 1}`}
									value={option.text}
									onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
									className="border w-full p-2 mr-2 rounded"
								/>
								<button
									onClick={addOption}
									className="bg-blue-500 text-white w-20 h-10 px-2 py-1 rounded"
								>
									<FaPlus />
								</button>
							</div>
						))}
						<div className="flex justify-end space-x-2 mt-3">
							<button
								onClick={closeModal}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
							>
								Cancel
							</button>
							<button
								onClick={saveData}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							>
								OK
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete confirmation modal */}
			{isDeleteModalOpen && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
						<p className="text-lg mb-4">Siz ushbu savolni o‘chirishni xohlaysizmi?</p>
						<div className="flex justify-between">
							<button
								onClick={deleteQuestion}
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
							>
								Ha
							</button>
							<button
								onClick={closeDeleteModal}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
							>
								Yo‘q
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Image Modal */}
			{showImage && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
						<img
							src={currentImage ? URL.createObjectURL(currentImage) : '#'}
							alt="Uploaded"
							className="w-full h-auto max-w-full max-h-[600px] object-contain"
						/>
						<button
							onClick={closeImageModal}
							className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default QuestionTable;
