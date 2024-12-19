import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Management from "./pages/ManagementSystem";
import Recovery from "./pages/Recovery";
import Tambah from "./pages/Tambah";
import ArticleDetail from "./components/ArticleDetail";
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="scrollable">
                {/* Routing ke berbagai halaman */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/recovery" element={<Recovery />} />
                    <Route path="/tambah" element={<Tambah />} />
                    <Route path="/article" element={<ArticleDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
