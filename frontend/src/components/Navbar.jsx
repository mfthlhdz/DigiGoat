import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import profil from "../assets/user.png"; // Avatar default
import prof from "../assets/image.png";
import logout from "../assets/logout.png";
import "../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Pengguna");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: username,
    email: email,
    password: "",
  });

  useEffect(() => {
    // Sinkronisasi dengan perubahan localStorage
    const syncLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUsername(localStorage.getItem("username") || "Pengguna");
      setEmail(localStorage.getItem("email") || "");
    };

    window.addEventListener("storage", syncLoginStatus);
    return () => {
      window.removeEventListener("storage", syncLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername("Pengguna");
    setEmail("");
    navigate("/");
  };

  const handleMenuToggle = () => setMenuVisible(!menuVisible);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: formData.username,
      email: formData.email,
      password: formData.password || undefined,
    };

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("username", result.username);
        localStorage.setItem("email", result.email);
        setUsername(result.username);
        setEmail(result.email);
        setFormData({
          username: result.username,
          email: result.email,
          password: "",
        });

        setIsModalOpen(false);
        setMenuVisible(false);
        alert("Profil berhasil diperbarui!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui profil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="DigiGoat Logo" className="logo-img" />
          <span className="navbar-title">DigiGoat</span>
        </div>
        <ul className="navbar-links">
          <li><a href="/" className={isActive("/") ? "active-link" : ""}>Beranda</a></li>
          <li><a href="/aboutus" className={isActive("/aboutus") ? "active-link" : ""}>Tentang Kami</a></li>
          <li><a href="/management" className={isActive("/management") ? "active-link" : ""}>Manajemen Sistem</a></li>
          <li><a href="/recovery" className={isActive("/recovery") ? "active-link" : ""}>Pemulihan Data</a></li>
        </ul>
        {isLoggedIn ? (
          <div className="profile-container">
            <button className="profile-button" onClick={handleMenuToggle}>
              <img src={profil} alt="Profile Icon" className="profile-avatar" />
            </button>
            {menuVisible && (
              <div className="profile-menu active">
                <div className="profile-header">
                  <img src={profil} alt="Profile Icon" className="profile-avatar" />
                  <span className="profile-name">{username}</span>
                  <span className="profile-email">{email}</span>
                </div>
                <div>
                  <button className="profile-menu-item" onClick={handleModalOpen}>
                    <img src={prof} alt="Edit Profil" className="menu-icon" />
                    Profilku
                  </button>
                  <button className="profile-menu-item" onClick={handleLogout}>
                    <img src={logout} alt="Logout" className="menu-icon" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>Masuk</button>
        )}
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={handleModalClose}>&times;</span>
            <h3>Edit Profil</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password Baru:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Kosongkan jika tidak ingin mengganti"
                />
              </label>
              <button type="submit" className="modal-button">Simpan</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
