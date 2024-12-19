import React from 'react';
import '../css/Management.css';
import managementIcon from '../assets/manajemen.png';
import dataRecoveryIcon from '../assets/pemulihan.png';

const ManagementSection = () => {
    return (
        <section className="management-section">
            <div className="overlay"></div>
            <h2>Solusi Cerdas untuk Pengelolaan</h2>
            <h2>Peternakan Kambing yang Efisien</h2>
            <div className="features">
                <div className="feature">
                    <div className="icon-text">
                        <img src={managementIcon} alt="Manajemen Sistem" className="icon" />
                        <h3>Manajemen Sistem</h3>
                    </div>
                    <p>Pencatatan Cerdas untuk Pemeliharaan dan Kesehatan Kambing</p>
                </div>
                <div className="feature">
                    <div className="icon-text">
                        <img src={dataRecoveryIcon} alt="Pemulihan Data" className="icon" />
                        <h3>Pemulihan Data</h3>
                    </div>
                    <p>Keputusan Berbasis Data dengan Sinkronisasi Cloud Peternakan Kambing</p>
                </div>
            </div>
        </section>
    );
};

export default ManagementSection;
