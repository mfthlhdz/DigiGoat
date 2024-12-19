import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Calendar from '../components/Calendar';
import HealthCard from '../components/HealthCard';
import Notes from '../components/Notes';
import needlogin from '../assets/fail.png';
import '../css/ManagementSystem.css';

const Management = () => {
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
    <div className="management-page">
      <Navbar />
      
      {/* Pop-up jika pengguna belum login */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <img src={needlogin} className="need-login" alt="Login Required" />
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

      <main className="management-content">
        <HealthCard />
        <Calendar />
        <Notes />
      </main>

      <Footer />
    </div>
  );
};

export default Management;
