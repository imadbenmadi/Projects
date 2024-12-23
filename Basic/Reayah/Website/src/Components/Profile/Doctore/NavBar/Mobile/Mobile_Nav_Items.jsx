import { Link } from "react-router-dom";
import { useAppContext } from "../../../../../AppContext"; // Import your context hook
import { TbLogout } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import Articles_icon from "../../../../../../public/Profiles/Nav/Articles.svg";
import Patients_icon from "../../../../../../public/Profiles/Nav/Patients.svg";
import Overview_icon from "../../../../../../public/Profiles/Nav/Overview.svg";
import Wallet_icon from "../../../../../../public/Profiles/Nav/Wallet.svg";
import { IoHomeOutline } from "react-icons/io5";

import Appointments_icon from "../../../../../../public/Profiles/Nav/Appointments.svg";
import inbox_icon from "../../../../../../public/Profiles/Nav/inbox.svg";
import Settings_icon from "../../../../../../public/Profiles/Nav/Settings.svg";

function Mobile_Nav_Items({
    MobileNav_Open,
    Toogle_Menu_Bar,
    Logout,
    LogoutClicked,
    Active_nav,
}) {
    const { isAuth, _id, user } = useAppContext();
    const patientId = window.localStorage.getItem("patientId");
    const doctorId = window.localStorage.getItem("doctorId");
    return (
        <div className="flex md:hidden border-t border-gray_white">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " -translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]  z-50 bg-white   text-perpol font-semibold `}
            >
                <div className=" w-[90%] ml-6 h-screen text-xl  mt-12 ">
                    <div className=" flex flex-col justify-between h-[80%] ">
                        <div>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Overview`}
                                className={`select-none flex items-center gap-2 mb-4  ml-6 mt-6 ${
                                    Active_nav === "Overview"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img
                                    src={Overview_icon}
                                    className=" w-7"
                                    alt=""
                                />
                                <span>Overview</span>
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Patients`}
                                className={`select-none flex items-center gap-2 mb-4  ml-6 mt-6 ${
                                    Active_nav === "Patients"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={Patients_icon} className="  w-7" />
                                <span>Patients</span>
                            </Link>

                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Appoints`}
                                className={`select-none flex items-center   gap-2 mb-4  ml-6 mt-6
                                 ${
                                     Active_nav === "Appoints"
                                         ? " bg-green px-3 w-fit rounded-full py-1"
                                         : "text-perpol hover:text-perpol "
                                 }`}
                            >
                                <img
                                    src={Appointments_icon}
                                    className="  w-7"
                                />{" "}
                                <span>Appontments</span>
                            </Link>
                            {/* <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Articles`}
                                className={`select-none flex items-center  gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Articles"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={Articles_icon} className="  w-7" />{" "}
                                Articles{" "}
                            </Link> */}
                            {/* <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Inbox`}
                                className={`select-none flex items-center   gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Inbox"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={inbox_icon} className="  w-7" /> Inbox
                            </Link> */}
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Settings`}
                                className={`select-none flex items-center   gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Settings"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={Settings_icon} className="  w-7" />{" "}
                                Settings
                            </Link>
                            {/* <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Doctores/${doctorId}/Wallet`}
                                className={`select-none flex items-center   gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Wallet"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={Wallet_icon} className="  w-7" />{" "}
                                Wallet
                            </Link> */}
                        </div>
                        <div className=" flex flex-col gap-6">
                            <div>
                                <Link
                                    to="/"
                                    className="text-perpol flex items-center gap-2 ml-6"
                                >
                                    <IoHomeOutline />
                                    Home
                                </Link>
                            </div>
                            <div>
                                <>
                                    {!LogoutClicked ? (
                                        <div
                                            className="text-perpol   flex items-center  gap-2   ml-6 "
                                            onClick={() => {
                                                Logout();
                                            }}
                                        >
                                            <TbLogout />
                                            Logout
                                        </div>
                                    ) : (
                                        <div className=" w-full flex items-center justify-center   text-perpol">
                                            <span className="small-loader"></span>
                                        </div>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>

                    {/* <div className=" w-full rounded-xl ml-6 mt-6 h-[2px]  bg-gray_white mb-4"></div> */}
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
