// src/components/ExportSettings.jsx
import React, { useState } from 'react';
import '../css/ExportSettings.css';

const ExportSettings = () => {
  const [format, setFormat] = useState('CSV');
  const [month, setMonth] = useState('Januari');

  const handleExport = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage

    const response = await fetch('http://localhost:5000/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ format, userId }), // Kirim format dan userId ke backend
    });

    if (response.ok) {
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `data_${userId}_${month}.${format.toLowerCase()}`;
      link.click(); // Simulasikan klik untuk mendownload
    } else {
      alert('Gagal mengekspor data');
    }
  };

  return (
    <section className="export-settings">
      <h2>Pengaturan Ekspor Data</h2>
      <label htmlFor="format-export">Format Ekspor</label>
      <select id="format-export" value={format} onChange={(e) => setFormat(e.target.value)}>
        <option>CSV</option>
        <option>EXCEL</option>
        <option>JSON</option>
      </select>

      <label htmlFor="date-range">Rentang Bulan</label>
      <select id="date-range" value={month} onChange={(e) => setMonth(e.target.value)}>
        <option>Januari</option>
        <option>Februari</option>
        <option>Maret</option>
        <option>April</option>
        <option>Mei</option>
        <option>Juni</option>
        <option>Juli</option>
        <option>Agustus</option>
        <option>September</option>
        <option>Oktober</option>
        <option>November</option>
        <option>Desember</option>
      </select>

      <button className="export-button" onClick={handleExport}>Ekspor Data</button>
    </section>
  );
};

export default ExportSettings;
