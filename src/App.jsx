import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import MobileMode from './MobileMode/MobileMode.jsx';
import { useState, useEffect } from 'react';
import DarkMode from './DarkMode/DarkMode.jsx';
import { Home } from './Home/Home.jsx';
import { Navibar } from './NavBar1/Navibar.jsx';
import { Search } from './Search/Search.jsx';
import './AppMobile.css';


function App() {
    const [sessionMobile] = useState(() => {
        const saved = sessionStorage.getItem('isMobile');
        return saved !== null ? saved === 'true' : isMobile;
    });

    useEffect(() => {
        if (sessionMobile === true) {
            import('./AppMobile.css');
        }
    }, [sessionMobile])

    console.log(sessionMobile);
    return (
        <HashRouter>
            <Navibar />
            <div className="setting">
                <div className="MobileMode">
                    <MobileMode />
                </div>
                <div className="darkmode">
                    <DarkMode />
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </HashRouter>
    )
}

export default App;
