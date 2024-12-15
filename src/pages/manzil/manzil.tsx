import { useState, useEffect } from 'react';
import { useManzilStore } from '../../store/manzilStore';
import { Link } from 'react-router-dom';
import Button from '../../components/Button'
// import Btn from '';

type Tuman = {
  viloyat: string;
  nom: string;
};

function Manzil() {
  const {
    viloyatlar,
    tumanlar,
    addViloyat,
    addTuman,
    deleteViloyat,
    deleteTuman,
    updateViloyat,
    updateTuman,
  } = useManzilStore();



  const [yangiViloyat, setYangiViloyat] = useState<string>('');
  const [yangiTuman, setYangiTuman] = useState<Tuman>({ viloyat: '', nom: '' });
  const [showViloyatModal, setShowViloyatModal] = useState<boolean>(false);
  const [showTumanModal, setShowTumanModal] = useState<boolean>(false);
  const [editingViloyat, setEditingViloyat] = useState<string | null>(null);
  const [editingTuman, setEditingTuman] = useState<Tuman | null>(null);

  useEffect(() => {
    const savedViloyatlar = JSON.parse(localStorage.getItem('viloyatlar') || '[]');
    const savedTumanlar = JSON.parse(localStorage.getItem('tumanlar') || '[]');
    savedViloyatlar.forEach((viloyat: string) => addViloyat(viloyat));
    savedTumanlar.forEach((tuman: Tuman) => addTuman(tuman));
  }, [addViloyat, addTuman]);

  const saveToLocalStorage = () => {
    localStorage.setItem('viloyatlar', JSON.stringify(viloyatlar));
    localStorage.setItem('tumanlar', JSON.stringify(tumanlar));
  };

  const postMalumotlar = async () => {
    const data = { viloyatlar, tumanlar };

    try {
      const response = await fetch("http://localhost:3000/user-profiles", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Maʼlumotlar muvaffaqiyatli yuborildi!');
        saveToLocalStorage();
      } else {
        alert('Maʼlumot yuborishda xatolik yuz berdi.');
      }
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Maʼlumot yuborishda xatolik yuz berdi.');
    }
  };

  const handleAddViloyat = () => {
    if (yangiViloyat.trim() && !viloyatlar.includes(yangiViloyat)) {
      addViloyat(yangiViloyat);
      setYangiViloyat('');
      setShowViloyatModal(false);
    }
  };

  const handleAddTuman = () => {
    if (yangiTuman.viloyat && yangiTuman.nom.trim()) {
      if (editingTuman) {
        updateTuman(editingTuman, yangiTuman); 
      } else {
        addTuman(yangiTuman); 
      }
      setYangiTuman({ viloyat: '', nom: '' });
      setShowTumanModal(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => setShowViloyatModal(true)} className="bg-blue-500 text-white p-3 rounded-lg mb-6">Viloyat Qo'shish</button>

      {showViloyatModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingViloyat ? 'Viloyatni tahrirlash' : 'Viloyat Qo\'shish'}</h2>
            <input
              type="text"
              value={yangiViloyat}
              onChange={(e) => setYangiViloyat(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Viloyat nomini kiriting"
            />
            <button onClick={handleAddViloyat} className="bg-green-500 text-white p-3 rounded-lg">
              {editingViloyat ? 'Viloyatni saqlash' : 'Viloyat qo\'shish'}
            </button>
            <button onClick={() => setShowViloyatModal(false)} className="bg-red-500 text-white p-3 rounded-lg mt-4">Cancel</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowTumanModal(true)} className="bg-green-500 text-white p-3 rounded-lg mb-6">Tuman Qo'shish</button>

      {showTumanModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingTuman ? 'Tumanni tahrirlash' : 'Tuman Qo\'shish'}</h2>
            <input
              type="text"
              value={yangiTuman.nom}
              onChange={(e) => setYangiTuman({ ...yangiTuman, nom: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Tuman nomini kiriting"
            />
            <select
              value={yangiTuman.viloyat}
              onChange={(e) => setYangiTuman({ ...yangiTuman, viloyat: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            >
              <option value="">Viloyat tanlang</option>
              {viloyatlar.map((viloyat, index) => (
                <option key={index} value={viloyat}>{viloyat}</option>
              ))}
            </select>
            <button onClick={handleAddTuman} className="bg-blue-500 text-white p-3 rounded-lg">
              {editingTuman ? 'Tumanni saqlash' : 'Tuman qo\'shish'}
            </button>
            <button onClick={() => setShowTumanModal(false)} className="bg-red-500 text-white p-3 rounded-lg mt-4">Cancel</button>
          </div>
        </div>
      )}

      {/* Table of Viloyatlar and Tumanlar */}
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">Viloyatlar va Tumanlar:</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Viloyat</th>
              <th className="border px-4 py-2">Tuman</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tumanlar.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.viloyat}</td>
                <td className="border px-4 py-2">{item.nom}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setEditingTuman(item);
                      setYangiTuman(item);
                      setShowTumanModal(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => deleteTuman(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={postMalumotlar} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Maʼlumotlarni yuborish</button>
        <Link to="/userprofile">User Profil</Link>
        <Button
          label="btn"
          onClick={() => console.log('bosildi')}
          
        //   className={{ color: 'red', fontSize: '14px', padding: '10px 20px', borderRadius: '12px' }}
        />
      </div>
    </div>
  );
}

export default Manzil;
