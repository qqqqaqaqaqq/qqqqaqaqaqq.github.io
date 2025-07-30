import { useState } from 'react'
import { isMobile } from 'react-device-detect';
import './MobileMode.css'
function MobileMode() {
    const [MobileMode, setMobileMode] = useState(() => {
        const saved = sessionStorage.getItem('isMobile');
        return saved !== null ? saved==='true' : isMobile;
    });

    function btntext() {
        if (MobileMode === true) {
            return (
                <>
                    Mobile
                </>
            )
        }
        else {
            return (
                <>
                    Desktop
                </>
            )
        }
    }

    return (
        <div className='mobilemode'>
            <button
                onClick={() => {
                    setMobileMode(!MobileMode);
                    sessionStorage.setItem('isMobile', !MobileMode);
                    window.location.href = '/';
                }}
            >
                <i className="fas fa-cog" style={{ marginRight: '8px' }}></i>
                {btntext()}
            </button>
        </div>
    )
}

export default MobileMode;