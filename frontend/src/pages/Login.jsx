import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import logo from '../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Cek apakah pengguna sudah login sebelumnya
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (token && isLoggedIn) {
      navigate('/'); // Arahkan ke halaman utama jika pengguna sudah login
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Email dan Password wajib diisi');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login berhasil!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('username', data.username);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setMessage(data.message || 'Login gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan pada server.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="DigiGoat Logo" className="auth-logo" />
        <h2>DigiGoat</h2>
        <h3>SELAMAT DATANG!</h3>
        <p>Log in to continue access to DigiGoat</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <label>Masuk</label>
          <input
            type="email"
            placeholder="Masukan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Masukan kata sandimu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
              {passwordVisible ? '👁️' : '🙈'}
            </button>
          </div>

          <button type="submit" className="auth-button">
            Masuk
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Belum punya akun DigiGoat? <a href="/Register">Daftar</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
