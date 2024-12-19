import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import '../css/HealthCard.css';
import goat from '../assets/goat.png';

function GaugeCard({ title, percentage, color, label }) {
  return (
    <div className="gauge-card">
      <GaugeChart
        id={`gauge-chart-${title.toLowerCase()}`}
        nrOfLevels={20}
        percent={percentage / 100}
        colors={[color, "#D3D3D3"]}
        arcWidth={0.3}
      />
      <p>Total {title}</p>
      <p style={{ color }}>{label}</p>
    </div>
  );
}

function GoatCountCard({ count }) {
  return (
    <div className="goat-count-card">
      <img src={goat} alt="Goat Icon" className="goat-icon" />
      <h3>Jumlah Kambing</h3>
      <p className="goat-count">{count}</p>
    </div>
  );
}

export default function StatCard() {
  const [healthData, setHealthData] = useState({
    totalKambing: 0,
    totalSehat: 0,
    totalSakit: 0,
  });

  // Ambil data kesehatan dari backend ketika komponen di-render
  useEffect(() => {
    const fetchHealthData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token tidak ditemukan');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/notes', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response Data:', data);  // Log seluruh data yang diterima
          setHealthData({
            totalKambing: data.notes.length,
            totalSehat: data.sehatPercentage || 0,  // Pastikan ada nilai default
            totalSakit: data.sakitPercentage || 0,
          });
        } else {
          console.error('Gagal mengambil data kesehatan.');
        }
      } catch (err) {
        console.error('Terjadi kesalahan:', err);
      }
    };

    fetchHealthData();
  }, []);

  return (
    <div className="stat-card-container">
      <GaugeCard
        title="Sehat"
        percentage={healthData.totalSehat}
        color="#4CAF50"
        label="Sehat"
      />
      <GaugeCard
        title="Sakit"
        percentage={healthData.totalSakit}
        color="#FF5722"
        label="Sakit"
      />
      <GoatCountCard count={healthData.totalKambing} />
    </div>
  );
}
