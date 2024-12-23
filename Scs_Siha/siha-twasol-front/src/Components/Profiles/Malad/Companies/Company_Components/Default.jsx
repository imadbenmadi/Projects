import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
function Default() {
    const location = useLocation();
    const eventId = location.pathname.split("/")[3];
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/Malad/Companies/${eventId}/Info`);
    }, []);
}

export default Default;
