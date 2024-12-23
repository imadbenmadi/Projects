import React from "react";
import { useAppContext } from "../../AppContext";
import { useState } from "react";
import Menu_Toogler from "./Menu_Toogler";
import Mobile_Nav_Items from "./Mobile_Nav_Items";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.svg";
// import user from "../../../public/user.svg";
import { FaRegUser } from "react-icons/fa";

function Mobile_Nav({ Active_nav, Logout, LogoutClicked }) {
    const {
        isAuth,
        FirstName,
        LastName,
        _id,
        Notifications,
        set_Auth,
        store_login,
    } = useAppContext();
    const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    function Toogle_Menu_Bar() {
        set_MobileNav_Open(!MobileNav_Open);
    }
    const patientId = window.localStorage.getItem("patientId");
    const doctorId = window.localStorage.getItem("doctorId");
    return (
        <>
            <div className=" flex gap-5 items-center justify-between mx-3 md:hidden h-full">
                <Menu_Toogler
                    MobileNav_Open={MobileNav_Open}
                    set_MobileNav_Open={set_MobileNav_Open}
                    Toogle_Menu_Bar={Toogle_Menu_Bar}
                />
                <div>
                    <Link to={"/"} className="select-none">
                        <img
                            src={Logo}
                            alt="Logo"
                            className=" w-[100px] lg:w-[145px] "
                        />
                    </Link>
                </div>

                {isAuth ? (
                    <Link
                        to={
                            patientId != "null"
                                ? `/Patients/${patientId}/Profile`
                                : doctorId != "null"
                                ? `/Doctores/${doctorId}/Profile`
                                : "/"
                        }
                        className=" w-8 h-8 rounded-full  flex items-center justify-center"
                    >
                        {/* <img src={user} alt="" />{" "} */}
                        <FaRegUser className=" text-white text-2xl " />
                    </Link>
                ) : (
                    <div className=" w-8 h-8"></div>
                )}
            </div>
            <Mobile_Nav_Items
                Active_nav={Active_nav}
                MobileNav_Open={MobileNav_Open}
                Toogle_Menu_Bar={Toogle_Menu_Bar}
                Logout={Logout}
                LogoutClicked={LogoutClicked}
            />
        </>
    );
}

export default Mobile_Nav;
