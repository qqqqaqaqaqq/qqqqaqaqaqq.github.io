import React from "react";
import { HashRouter, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from './Header/Header.jsx';
import HomePage from './Home/Home.jsx';
import ContactPage from './Contact/Contact.jsx';
import ScrollToTop from './ScrollToTop';
import ShopPage from './Shop_Component/ShopMain.jsx';



function Home() {
    return (
        <HomePage />
    );
}

function Shop() {
    return (
        <ShopPage />
    );
}
function MyPage() {
    return <div>My Page</div>;
}

function Purchase() {
    return <div>Purchase Page</div>;
}

function Contact() {
    return (
        <ContactPage />
    );
}

function App() {
    return (
        <HashRouter>
            <div className="Main_Header">
                <Header />
            </div>
            <ScrollToTop />
            <div className="Main_Body">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </div>
            <div className="Main_Footer">
                <p>Copyright © 2025 Automated Factory. All rights reserved.</p>
            </div>
        </HashRouter>
    );
}

export default App;
