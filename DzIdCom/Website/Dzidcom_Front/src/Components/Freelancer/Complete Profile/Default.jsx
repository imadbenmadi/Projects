import React from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Freelancer/Complete_Profile/Step_0");
    }, []);
    return null;
}

export default Default;
