import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import LoginModal from "./Header_LoginModal.jsx";
import SignUpModal from "./Header_SignUpModal.jsx";
import './Header.css';
import './Header_Modal.css';

function Header() {
    const [isBurgerOpen, setBurgerOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const selectedPart = searchParams.get('menu');
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = sessionStorage.getItem('accessToken');
        setToken(savedToken);
    }, []);

    const toggleBurger = () => {
        setBurgerOpen(!isBurgerOpen);
    };


    return (
        <header>
            <div className="Header_PC_Html">
                <div className="Header_PC_Logo">
                    <Link to="/home" className="home">AutoMobile</Link>
                </div>

                <div className="Header_PC_html_Menu">
                    <Link to="/shop" className="menu">Shop</Link>
                    <Link to="/purchase" className="purchase">Purchase</Link>
                    <Link to="/contact" className="contact">Contact</Link>
                    <Link to="/mypage" className="step">MyPage</Link>
                </div>

                <div className="Header_PC_html_Modal">
                    {token ? (
                        <button
                            onClick={() => {
                                sessionStorage.removeItem('accessToken');
                                window.location.href = "/";
                            }}
                            className="logout"
                        >
                            Log out
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => setShowLogin(true)}
                                className={`login ${selectedPart === 'login' ? 'active' : ''}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setShowSignup(true)}
                                className={`signup ${selectedPart === 'signup' ? 'active' : ''}`}
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="Header_Mobile_Html">
                <div className="Header_Mobile_Logo">
                    <Link to="/home" className="home">AutoMobile</Link>
                </div>

                <div className="Header_Mobile_Html_Menu">
                    <a
                        className={`Header_Mobile_Html_Menu_Hambuger ${isBurgerOpen ? 'active-1' : ''}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleBurger();
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>

                <div className="Header_Mobile_Menu_Content_Active">
                    <div
                        className={`Header_Mobile_Menu_Content ${isBurgerOpen ? 'active-1' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleBurger();
                        }
                        }>
                        <div className="Spacer">

                        </div>
                        <Link to="/home" className="menu">Home</Link>
                        <Link to="/shop" className="menu">Shop</Link>
                        <Link to="/purchase" className="menu">Purchase</Link>
                        <Link to="/contact" className="menu">Contact</Link>
                        <Link to="/mypage" className="menu">MyPage</Link>
                        {token ? (
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem('accessToken');
                                    window.location.href = "/";
                                }}
                                className="logout"
                            >
                                Log out
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className={`login ${selectedPart === 'login' ? 'active' : ''}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setShowSignup(true)}
                                    className={`signup ${selectedPart === 'signup' ? 'active' : ''}`}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>


            </div>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showSignup && <SignUpModal onClose={() => setShowSignup(false)} />}

        </header>
    );
}

export default Header;