import React from "react";
import "../css/Footer.css";
import logo from "../assets/logo.png";
import downloadImage from '../assets/download.png';
import facebookIcon from '../assets/Facebook.png';
import instagramIcon from '../assets/Instagram.png';
import twitterIcon from '../assets/Twitter.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo dan Nama DigiGoat dalam satu baris */}
        <div className="footer-section logo-section">
          <img src={logo} alt="DigiGoat Logo" className="logo-image" />
          <span className="logo-text">DigiGoat</span>
        </div>

        <div className="footer-section contact-info">
          <h4>Informasi Kontak</h4>
          <p>3726mdpldigigoat@gmail.com</p>
          <p>+62 851 1928 3746</p>
          <p>Jl Agraris Soerabaja No. 24</p>
          <div className="footer-section footer-links">
            <a href="/AboutUs">Tentang Kami</a>
            <a href="/management">Manajemen Sistem</a>
            <a href="/recovery">Pemulihan Data</a>
          </div>
        </div>
        
        <div className="footer-section app-download">
          <h4>Download aplikasi DigiGoat Mobile:</h4>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={downloadImage} alt="Get it on Google Play" className="download-button" />
          </a>
        </div>
      </div>
      <div className="social-icons">
        <a href="#facebook" aria-label="Facebook">
        <img src={facebookIcon} alt="Facebook" className="social-icon" />
        </a>
        <a href="#instagram" aria-label="Instagram">
        <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
        <a href="#twitter" aria-label="Twitter">
        <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
      </div>
      <div className="footer-bottom">
        <p>© 2024 DigiGoat All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
