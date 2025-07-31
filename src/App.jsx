import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import MobileMode from './MobileMode/MobileMode.jsx';
import DarkMode from './DarkMode/DarkMode.jsx';
import { Home } from './Home/Home.jsx';
import { Navibar } from './NavBar1/Navibar.jsx';
import { Search } from './Search/Search.jsx';

function App() {
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
