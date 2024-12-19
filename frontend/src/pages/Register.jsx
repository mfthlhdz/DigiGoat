import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import logo from '../assets/logo.png';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validasi password dan konfirmasi password
    if (password !== confirmPassword) {
      setMessage('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Pendaftaran berhasil! Silakan login.');
        setTimeout(() => {
          navigate('/login'); // Arahkan ke halaman login setelah pendaftaran berhasil
        }, 2000);
      } else {
        setMessage(data.message || 'Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan pada server.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <img src={logo} alt="DigiGoat Logo" className="signup-logo" />
          <h2>DigiGoat</h2>
          <h3>SELAMAT DATANG!</h3>
          <p>Daftar untuk mengakses DigiGoat</p>

          <form className="signup-form" onSubmit={handleSignup}>
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Sandi</label>
            <div className="signup-password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={togglePasswordVisibility} className="signup-password-toggle">
                {passwordVisible ? '👁️' : '🙈'}
              </span>
            </div>
            <label>Konfirmasi Sandi</label>
            <div className="signup-password-container">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="Konfirmasi Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="signup-password-toggle"
              >
                {confirmPasswordVisible ? '👁️' : '🙈'}
              </span>
            </div>
            <button type="submit" className="signup-button">Daftar</button>
            <p className="signup-footer">
              Sudah punya akun? <a href="/login">Masuk</a>
            </p>
          </form>

          {message && <p className="signup-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
