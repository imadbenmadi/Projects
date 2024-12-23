import React, { useEffect } from "react";
import { useNavigate } from "react-router";
function Default() {
    const Navigate = useNavigate();
    const doctoreId = window.localStorage.getItem("doctorId");
    useEffect(() => {
        Navigate(`/Doctores/${doctoreId}/Overview`);
    }, []);
    return null;
}

export default Default;
