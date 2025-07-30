import { useEffect, useState } from 'react';
import './btn.css'
import './GuestAuthOptions.css'
import { Link } from 'react-router-dom';

function GuestAuthOptions({ link_loginpage, link_authpage }) {
    const [isLoginToken] = useState(() => {
        const saved = sessionStorage.getItem('logintoken')
        return saved !== null ? true : false;
    });

    const saved = sessionStorage.getItem('logintoken') !== null ? true : false;

    useEffect(() => {

    }, [isLoginToken]);

    /* Saved Token in Session Storage
       => Show Mini User's Dashboard */
    if (isLoginToken === true) {
        return (
            <div className="auth-guest-actions">
                <button className="rectanglebtn" >
                </button>
            </div>

        );
    }
    /* Not Saved Token in Session Storage 
       => Show Login Board */
    else {
        return (
            <div className="unauth-guest-actions">
                {link_loginpage.map((item) => (
                    <Link
                        to={item.url}
                        key={item.id}
                        className="rectanglebtn"
                    >
                        Get Login
                    </Link>
                ))}
                <div className="autoactionwrap">
                    {link_authpage.map((item) => (
                        <Link 
                            to={item.url}
                            key={item.id}
                            className="rectanglebtn"
                        >
                            <img src={item.img_url}
                                className="custombtn-number1"
                            ></img>
                            {item.name}
                        </Link>
                    ))
                    }
                </div>
            </div>
        )
    }
}

export default GuestAuthOptions;