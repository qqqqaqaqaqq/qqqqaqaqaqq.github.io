import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Auto scroll to top on route change

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}