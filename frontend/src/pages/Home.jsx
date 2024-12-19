import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ManagementSection from '../components/Management';
import DownloadSection from '../components/Download';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <ManagementSection />
            <DownloadSection />
        </div>
    );
};

export default Home;
