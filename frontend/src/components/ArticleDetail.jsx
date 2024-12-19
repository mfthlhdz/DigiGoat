// src/components/ArticleDetail.jsx
import React from 'react';
import Navbar from './Navbar';
import '../css/ArticleDetail.css';
import articleImage from '../assets/1.png'; // Menggunakan import gambar

const ArticleDetail = () => (
  <div>
    <Navbar />
    <div className="article-detail">
      <img
        src={articleImage} // Menggunakan variabel gambar yang di-import
        alt="Article"
        className="article-detail-image"
      />
      <div className="article-detail-content">
        <h1 className="article-detail-title">
          Semangat Bomber Persik Kediri Isi Libur Kompetisi dengan Ternak Kambing.
        </h1>
        <p className="article-detail-date">13 Jan 2024</p>
        <p className="article-detail-text">
          Kediri - Striker Persik Kediri Mohammad Khanafi sangat sibuk menjelang libur kompetisi. Dia punya kegiatan yang tidak bisa ditinggalkan, yakni merawat kambing. Khanafi sudah lama menekuni dunia peternakan. Orang tuanya sudah memiliki usaha itu sejak lama. Namun, dia baru ternak kambing sendiri sekitar tiga tahun terakhir.
        </p>
        <p className="article-detail-text">
          "Saya sudah biasa ternak sapi atau kambing. Sebab itu usaha bapak saya sejak dulu. Cuma, saya sekarang sudah punya usaha ternak sendiri," kata pemain berusia 26 tahun itu kepada detikJatim, Kamis (13/5/2024). Bedanya, Khanafi saat ini tidak ternak sapi. Dia lebih fokus kepada kambing. Sebanyak 15 kambing tersedia di kandang.
        </p>
        <p className="article-detail-text">
          "Kalau sekarang lagi fokus ke kambing. Soalnya sapi terlalu berat dan butuh banyak waktu untuk ngerawatnya" sambungnya.
        </p>
        <p className="article-detail-text">
          Libur kompetisi seperti saat ini membuat Khanafi lebih sering datang ke kandang. Dia sama sekali tidak gengsi merawat kambingnya sendiri. Tiap hari Khanafi memberikan makan dan minum untuk kambingnya. Tidak hanya itu, dia juga aktif mengecek kondisi hewan ternaknya.
        </p>
        <p className="article-detail-text">
          "Kalau libur kayak gini saya urus sendiri. Paling dibantu istri. Tapi kalau saya tinggal latihan tetap ada yang urus," terang pemain bernomor punggung 7 di Persedikab Kediri.
        </p>
      </div>
    </div>
  </div>
);

export default ArticleDetail;
