import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const { isAuth, userType, userId } = useAppContext();
    const Navigate = useNavigate();
    useEffect(() => {
        if (!isAuth || !userType) Navigate("/Home");
        else if (isAuth && userType == "client") {
            // Navigate(`/Client/${userId}`);
            Navigate(`/Client`);
        } else if (isAuth && userType == "freelancer") {
            // Navigate(`/Freelancer/${userId}`);
            Navigate(`/Freelancer`);
        } else Navigate("/Home");
    }, []);
}
export default Default;
