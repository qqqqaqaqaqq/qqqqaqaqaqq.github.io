import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from './Header/Header.jsx';
import HomePage from './Home/Home.jsx';
import RobotPage from './Robot/Robot.jsx';
import ContactPage from './Contact/Contact.jsx';
import ScrollToTop from './ScrollToTop';



function Home() {
    return (
        <HomePage />
    );
}

function Robot() {
    return (
        <RobotPage />
    );
}
function MyPage() {
    return;
}

function Purchase() {
    return;
}

function Contact() {
    return (
        <ContactPage />
    );
}

function App() {
    return (
        <BrowserRouter  >
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/robot" element={<Robot />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
