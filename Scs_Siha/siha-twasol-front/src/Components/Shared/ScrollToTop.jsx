import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top whenever the location changes
        window.scrollTo(0, 0);
    }, [location]);

    return null;
};

export default ScrollToTop;
