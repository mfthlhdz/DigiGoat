import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Notes.css"; // Import CSS yang telah diperbarui

function HistoryTable() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [warningMessage, setWarningMessage] = useState(""); // Menambahkan state untuk pesan peringatan
  const [currentNoteId, setCurrentNoteId] = useState(null); 
  const navigate = useNavigate();

  // Fungsi untuk mengambil data notes
  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const token = verifyToken();
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/notes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleSessionExpired();
          return;
        }
        throw new Error("Gagal mengambil data.");
      }

      const data = await response.json();
      // Periksa apakah data.notes adalah array
      if (Array.isArray(data.notes)) {
        setNotes(data.notes); // Set notes jika valid
      } else {
        setError("Data notes tidak valid.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memverifikasi token
  const verifyToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login kembali.");
      navigate("/login");
      return null;
    }
    return token;
  };

  // Fungsi untuk menangani sesi yang kadaluarsa
  const handleSessionExpired = () => {
    alert("Sesi telah berakhir. Silakan login kembali.");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fungsi untuk menghapus catatan
  const handleHapusCatatan = async (id) => {
    setDeletingId(id);
    try {
      const token = verifyToken();
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        setWarningMessage(""); // Menghapus pesan peringatan setelah berhasil menghapus
      } else {
        const errorData = await response.json();
        alert(`Gagal menghapus catatan: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus data.");
    } finally {
      setDeletingId(null);
    }
  };

  // Fungsi untuk membuka pesan peringatan sebelum menghapus catatan
  const openDeleteWarning = (id) => {
    setCurrentNoteId(id);
    setWarningMessage("Apakah Anda yakin ingin menghapus catatan ini?");
  };

  // Fungsi untuk menutup pesan peringatan
  const closeWarning = () => {
    setWarningMessage(""); // Menutup pesan peringatan
  };

  // Mengambil data notes ketika komponen dimuat
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fungsi untuk menambah catatan
  const handleTambahCatatan = () => {
    navigate("/tambah");
  };

  // Penyaringan notes berdasarkan query pencarian
  const filteredNotes = notes.filter((note) =>
    note.idKambing.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="history-container">
      <div className="search-bar">
        <h1 className="history-title">Riwayat Catatan</h1>
        <input
          type="text"
          placeholder="Cari ID Kambing..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-button" onClick={handleTambahCatatan}>
          Tambah Catatan <span className="plus-icon">+</span>
        </button>
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID Kambing</th>
              <th>Tanggal</th>
              <th>Umur Kambing(Tahun)</th>
              <th>Berat(Kg)</th>
              <th>Jenis Kelamin</th>
              <th>Kondisi Kesehatan</th>
              <th>Pakan</th>
              <th>Jumlah Pakan(kg)</th>
              <th>Perawatan</th>
              <th>Catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <tr key={note._id}>
                  <td>{index + 1}</td>
                  <td>{note.idKambing}</td>
                  <td>{new Date(note.tanggal).toLocaleDateString()}</td>
                  <td>{note.umurKambing}</td>
                  <td>{note.berat}</td>
                  <td>{note.jenisKelamin}</td>
                  <td>{note.kondisiKesehatan}</td>
                  <td>{note.pakan}</td>
                  <td>{note.jumlahPakan}</td>
                  <td>{note.perawatan}</td>
                  <td>{note.catatan}</td>
                  <td>
                    <button
                      onClick={() => openDeleteWarning(note._id)}
                      className="delete-button"
                      disabled={deletingId === note._id}
                    >
                      {deletingId === note._id ? "Menghapus..." : "Hapus"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">Tidak ada catatan ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pesan Peringatan Hapus */}
      {warningMessage && (
        <div className="delete-warning">
          <p>{warningMessage}</p>
          <button
            onClick={() => handleHapusCatatan(currentNoteId)}
            className="confirm-delete"
          >
            Hapus
          </button>
          <button onClick={closeWarning} className="cancel-delete">
            Batal
          </button>
        </div>
      )}
    </div>
  );
}

export default HistoryTable;
