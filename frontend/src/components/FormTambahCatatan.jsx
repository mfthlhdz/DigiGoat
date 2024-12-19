import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FormTambahCatatan.css";

const FormTambahCatatan = () => {
  const [formData, setFormData] = useState({
    idKambing: "",
    tanggal: "",
    umurKambing: "",
    berat: "",
    jenisKelamin: "",
    pakan: "",
    jumlahPakan: "",
    catatan: "",
    perawatan: "",
  });

  const navigate = useNavigate();

  // Ambil token dari localStorage saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan! Silakan login terlebih dahulu.");
      navigate("/login");
    }
  }, [navigate]);

  // Handle input perubahan nilai pada form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan! Pastikan Anda sudah login.");
      navigate("/login");
      return;
    }

    try {
      // Kirim data ke backend sesuai format yang diharapkan
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data berhasil ditambahkan!");
        navigate("/management"); // Navigasi kembali ke halaman manajemen
      } else {
        const errorData = await response.json();
        alert(`Gagal menambahkan data: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="form-tambah-catatan-container">
      <h1>Tambah Catatan</h1>
      <form className="form-tambah-catatan-form" onSubmit={handleSubmit}>
        {/* Mapping input berdasarkan key pada formData */}
        {Object.keys(formData).map((key) => (
          <div className="form-tambah-catatan-group" key={key}>
            <label className="form-tambah-catatan-label">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </label>
            {key === "jenisKelamin" || key === "pakan" ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-tambah-catatan-select"
                required
              >
                <option value="">
                  Pilih {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </option>
                {key === "jenisKelamin" ? (
                  <>
                    <option value="jantan">Jantan</option>
                    <option value="betina">Betina</option>
                  </>
                ) : (
                  <>
                    <option value="rumput">Rumput</option>
                    <option value="konsentrat">Konsentrat</option>
                    <option value="lainnya">Lainnya</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={key === "tanggal" ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-tambah-catatan-input"
                required
              />
            )}
          </div>
        ))}
        <div className="form-tambah-catatan-button-container">
          <button
            type="button"
            className="form-tambah-catatan-button batal"
            onClick={() => window.history.back()}
          >
            Batal
          </button>
          <button type="submit" className="form-tambah-catatan-button tambah">
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTambahCatatan;
