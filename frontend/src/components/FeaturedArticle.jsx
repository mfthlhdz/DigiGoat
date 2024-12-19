import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BeritaCard.css';

const FeaturedArticle = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/full-article'); // Mengarahkan ke halaman full article
  };

  return (
    <div className="featured-article">
      <img
        src="/path/to/image.jpg" // Ganti dengan path gambar yang sesuai
        alt="Featured"
        className="featured-article-image"
      />
      <div className="featured-article-content">
        <h2 className="featured-article-title">
          Semangat Bomber Persik Kediri Isi Libur Kompetisi dengan Ternak Kambing.
        </h2>
        <p className="featured-article-description">
          Kediri - Striker Persik Kediri Mochammad Kamal sangat sibuk mengisi libur kompetisi.
          Ia punya kegiatan yang tidak bisa diabaikan, yakni merawat kambing. Kegiatan ini
          merupakan bagian dari perencanaan...
        </p>
        <button className="featured-article-button" onClick={handleReadMore}>
          Baca Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default FeaturedArticle;
