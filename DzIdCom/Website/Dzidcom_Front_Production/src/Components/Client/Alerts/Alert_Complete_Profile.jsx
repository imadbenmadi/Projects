import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useAppContext } from "../../../AppContext";
function Alert_Complete_Profile() {
    const { set_show_Alert_completeProfile, show_Alert_completeProfile } =
        useAppContext();
    const [show, setShow] = useState(true);
    const Navigate = useNavigate();

    return show_Alert_completeProfile ? (
        <div
            className="w-full min-h-10 py-3 bg-perpol_v text-white text-sm md:text-lg md:text-center flex select-none
        items-center justify-start pl-5 md:pl-0 md:justify-center gap-4  md:gap-12"
        >
            <div>
                Please complete your profile to unlock full platform access.{" "}
                <span
                    className="underline cursor-pointer"
                    onClick={() => {
                        Navigate("/Client/Complete_Profile");
                    }}
                >
                    Complete Profile page
                </span>{" "}
            </div>
            <span
                className="text-2xl w-24 text-white font-semibold cursor-pointer"
                onClick={() => {
                    set_show_Alert_completeProfile(false);
                }}
            >
                <IoClose />
            </span>
        </div>
    ) : null;
}

export default Alert_Complete_Profile;
