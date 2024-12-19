// src/pages/DataRecovery.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImportSettings from '../components/ImportSettings';
import ExportSettings from '../components/ExportSettings';
import needlogin from '../assets/fail.png';
import '../css/DataRecovery.css';

const DataRecovery = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State untuk kontrol tampilan pop-up

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Cek status login
    if (!isLoggedIn) {
      setShowLoginPopup(true); // Tampilkan pop-up jika pengguna belum login
    }
  }, []);

  const handleLoginClick = () => {
    setShowLoginPopup(false); // Sembunyikan pop-up
    navigate('/login'); // Arahkan ke halaman login
  };

  const handleBackClick = () => {
    navigate('/'); // Arahkan ke halaman beranda
  };

  return (
    <div className="data-recovery-page">
      <Navbar />
      
      {/* Pop-up jika pengguna belum login */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <img src={needlogin} className="need-login" />
            <h3>Silahkan login terlebih dahulu!</h3>
            <div className="popup-buttons">
              <button onClick={handleBackClick} className="back-popup-button">
                Kembali
              </button>
              <button onClick={handleLoginClick} className="login-popup-button">
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="data-recovery-content">
        <div className="import-export-section">
          <ImportSettings />
          <ExportSettings />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataRecovery;
