import React, { useEffect } from "react";
import { useNavigate } from "react-router";
function Default() {
    const Navigate = useNavigate();
    const patientId = window.localStorage.getItem("patientId");

    useEffect(() => {
        Navigate(`/Patients/${patientId}/Profile`);
    }, []);
    return null;
}

export default Default;
