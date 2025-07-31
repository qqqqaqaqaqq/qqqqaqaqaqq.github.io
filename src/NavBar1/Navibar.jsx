import './Navibar.css';
import './CommonCSS/btn.css'
import GuestAuthOptions from './AutoModal/GuestAuthOptions.jsx';
import { logo, link_menupage, link_authpage, link_loginpage, link_iconpage, link_searchimage } from './datalist.jsx';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

export function Navibar() {
    const [MobileMode] = useState(() => {
        const saved = sessionStorage.getItem('isMobile');
        return saved !== null ? saved === 'true' : isMobile;
    });

    useEffect(() => {
        if (MobileMode === true) {
            import('./CommonCSS/MobileCSS.css');
        }
        else {
            import('./CommonCSS/PcCSS.css');
        }
    }, [MobileMode])


    return (
        < div className="navigate" >
            {/* 
                 -navigate
                    -left
                        -icon
                        -logo
                            -linkbox
                    -center
                        -ssearch
                        -link
                            -rectanglebtn
                                -custombtn-number1
                    -right
                        -icon
                            -rectanglebtn
                                -radiusbtn
                        -mini-dashborad
            */}
            <div className="left">
                <div className="icon" >

                </div>
                <div className='logo'>
                    {logo.map((item) => (
                        <Link to={item.url} key={item.id} className="rectanglebtn" tabIndex="0">
                            <img src={item.img_url}
                                alt={item.name} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="center">
                <form className="nav-search">
                    {link_searchimage.map((item) => (
                        <Link to={item.url} key={item.id}>
                            <img src={item.img_url}></img>
                        </Link>
                    ))}
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                <div className="link">
                    <>
                        {link_menupage.map((item) => (
                            <Link to={item.url} key={item.id} className="rectanglebtn" tabIndex="0">
                                <img src={item.img_url}
                                    alt={item.name}
                                    className="custombtn-number1"
                                />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </>
                </div>
            </div>
            <div className="right">
                <div className="icon" >
                    {link_iconpage.map((item) => (
                        <Link to={item.url} key={item.id} className="rectanglebtn" tabIndex="0">
                            <img src={item.img_url}
                                alt={item.name}
                                className="radiusbtn"
                            />
                        </Link>
                    ))}
                    <div className="mobileicon">
                        {link_loginpage.map((item) => (
                            <Link to={item.url} key={item.id} className="rectanglebtn" tabIndex="0">
                                <img src={item.img_url}
                                    className="radiusbtn"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mini-dashborad">
                    <GuestAuthOptions link_loginpage={link_loginpage} link_authpage={link_authpage} />
                </div>
            </div>

        </div >
    );
}