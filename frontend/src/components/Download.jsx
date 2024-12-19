import React from 'react';
import '../css/Download.css';
import hp from '../assets/hp.png';
import downloadImage from '../assets/download.png';

const DownloadSection = () => {
    return (
        <section className="download-section">
            <div className="overlay"></div>
            <div className="download-container">
                <div className="phone-mockup">
                    <img src={hp} alt="Phone mockup" />
                </div>
                <div className="download-text">
                    <h2>Download Aplikasi</h2>
                    <h2>Mobile <span className="highlight">App Kami</span></h2>
                    {/* Ganti button dengan gambar */}
                    <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                        <img src={downloadImage} alt="Get it on Google Play" className="download-button" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;
