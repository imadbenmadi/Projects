import React from "react";
import { useAppContext } from "../../../AppContext";
import Alert_Complete_Profile from "../Alerts/Alert_Complete_Profile";
import Hero from "./Hero";
import PersonalInformations from "./PersonalInformations";
import Reviews from "./Reviews";
import { useEffect } from "react";
import { useNavigate } from "react-router";
function Client_Profile() {
    const Navigate = useNavigate();
    const { show_Alert_completeProfile, user } = useAppContext();
     useEffect(() => {
         if (!user || !user.id) Navigate("/");
     }, [user]);
    return (
        <div>
            {show_Alert_completeProfile && <Alert_Complete_Profile />}
            <Hero />
            <PersonalInformations />
            <Reviews />
        </div>
    );
}

export default Client_Profile;
