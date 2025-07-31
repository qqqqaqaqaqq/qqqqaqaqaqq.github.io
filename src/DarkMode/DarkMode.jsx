import React, { useState, useEffect } from 'react';
import "./DarkMode.css"

function DarkMode() {
    const [isdarkmode, setisdarkmode] = useState(() => {
        const savedMode = localStorage.getItem('darkmode');
        return savedMode !== null ? savedMode === 'true' : true;
    });

    useEffect(() => {
        localStorage.setItem('darkmode', isdarkmode);
    }, [isdarkmode]);

    document.body.classList.toggle('dark', isdarkmode);
    document.body.classList.toggle('light', !isdarkmode);

    return (
        <button
            className="dark-mode-toggle"
            onClick={() =>
                setisdarkmode(!isdarkmode)
            }>
            <i className="fas fa-cog" style={{ marginRight: '8px' }}></i>
            Dark Mode
        </button>
    );
}

export default DarkMode;