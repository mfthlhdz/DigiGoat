// src/components/ImportSettings.jsx
import React, { useState } from 'react';
import '../css/ImportSettings.css';

const ImportSettings = () => {
  const [format, setFormat] = useState('CSV');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');  // Ambil userId dari localStorage

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);  // Kirim userId ke backend

    const response = await fetch('http://localhost:5000/api/import', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert('Data berhasil diimpor');
    } else {
      alert('Gagal mengimpor data');
    }
  };

  return (
    <section className="import-settings">
      <h2>Pengaturan Impor Data</h2>
      <label htmlFor="import-format">Format Impor</label>
      <select id="import-format" value={format} onChange={(e) => setFormat(e.target.value)}>
        <option>CSV</option>
        <option>EXCEL</option>
        <option>JSON</option>
      </select>
      <label htmlFor="import-file">Impor Data</label>
      <input type="file" id="import-file" onChange={handleFileChange} />
      <button className="import-button" onClick={handleImport}>Import Data</button>
    </section>
  );
};

export default ImportSettings;
