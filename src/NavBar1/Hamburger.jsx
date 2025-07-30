import './Hamburger.css'
import { useState } from 'react';

function Hamburgericon() {
    const [isClick, setisClick] = useState(false);

    return (
        /* <a> <a> </a> </a> impossible*/
        <a
            className={`hamburger ${isClick ? 'active' : ''}`}
            onClick={() => setisClick(!isClick)}
        >
            <span
                className={`line1  ${isClick ? 'active' : ''}`}
            ></span>
            <span
                className={`line2  ${isClick ? 'active' : ''}`}
            ></span>
            <span
                className={`line3  ${isClick ? 'active' : ''}`}
            ></span>
        </a>
    )
}
export default Hamburgericon;