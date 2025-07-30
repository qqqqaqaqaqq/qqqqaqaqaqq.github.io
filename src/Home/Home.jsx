import './Home.css';
import { useState, useEffect } from 'react';
import MiniForm1 from '../MiniForm/MiniForm.jsx';
import MiniForm2 from '../MiniForm/MiniForm.jsx';
import { isMobile } from 'react-device-detect';

const link = [
    { id: 'search', name: 'search', url: '/search', img_url: '', btnstyle: 'dashboard' }
]

const link2 = [
    { id: 'search', name: 'search', url: '/search', img_url: '', btnstyle: 'rectanglebtn' }
]

export function Home() {
    const [MobileMode] = useState(() => {
        const saved = sessionStorage.getItem('isMobile');
        return saved !== null ? saved === 'true' : isMobile;
    });

    useEffect(() => {
        if (MobileMode === true) {
            import('./HomeMobile.css');
        }
    }, [MobileMode])

    return (
        <div className="home">

        </div>
    )
}
