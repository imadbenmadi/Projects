import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";

import Articles_icon from "../../../../../public/Profiles/Nav/Articles.svg";
import Patients_icon from "../../../../../public/Profiles/Nav/Patients.svg";
import Overview_icon from "../../../../../public/Profiles/Nav/Overview.svg";
import Wallet_icon from "../../../../../public/Profiles/Nav/Wallet.svg";

import Appointments_icon from "../../../../../public/Profiles/Nav/Appointments.svg";
import inbox_icon from "../../../../../public/Profiles/Nav/inbox.svg";
import Settings_icon from "../../../../../public/Profiles/Nav/Settings.svg";
import image_not_found from "../../../../../public/image_not_found.png";
function Laptop() {
    const Navigate = useNavigate();
    const doctoreId = window.localStorage.getItem("doctorId");
    const { set_Auth, user } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Profile");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[3]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);
    const handleLogout = async () => {
        setLogoutClicked(true);
        window.localStorage.removeItem("patientId");
        window.localStorage.removeItem("doctorId");
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        set_Auth(false);
        // Swal.fire("Success!", `Logged Out Successfully`, "success");
        window.location.href = "/";
        setLogoutClicked(false);
    };
    return (
        <div className="flex flex-col justify-around  text-lg font-semibold text-perpol   py-4 w-full">
            <div className="   mx-auto flex flex-col items-center justify-center">
                {user?.picture ? (
                    <img
                        src={`https://api.reayahmed.com/${user?.picture}`}
                        className=" w-24 h-24 object-cover border-4 border-t-green border-l-green border-r-green rounded-full border-b-transparent "
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = image_not_found;
                        }}
                        alt=""
                    />
                ) : (
                    <div className=" w-24 h-24 border-4 border-t-green border-l-green border-r-green rounded-full border-b-transparent text-8xl text-gray_white flex items-center justify-center ">
                        <FaCircleUser />
                    </div>
                )}
                {user?.full_name ? (
                    <div className="text-center text-xl font-bold mt-2">
                        {user?.full_name}
                    </div>
                ) : (
                    <div className="text-center text-xl font-bold mt-2">
                        User
                    </div>
                )}
            </div>
            <div className=" flex flex-col gap-4 pl-8 ">
                <Link
                    to={`/Doctores/${doctoreId}/Overview`}
                    className={` ${
                        Active_nav == "Overview"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none
                      w-[200px] rounded-full flex items-center gap-2  `}
                >
                    <img src={Overview_icon} className=" w-7" alt="" />
                    {/* <FiUser className="text-2xl  " /> */}
                    <span>Overview</span>
                </Link>
                <Link
                    to={`/Doctores/${doctoreId}/Patients`}
                    className={` ${
                        Active_nav == "Patients"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  flex items-center gap-2`}
                >
                    <img src={Patients_icon} className=" w-7" alt="" />
                    <span>Patients</span>
                </Link>
                <Link
                    to={`/Doctores/${doctoreId}/Appoints`}
                    className={` ${
                        Active_nav == "Appoints"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full  flex items-center gap-2`}
                >
                    <img src={Appointments_icon} className=" w-7" alt="" />
                    <span>Appontments</span>
                </Link>

                {/* <Link
                    to={`/Doctores/${doctoreId}/Articles`}
                    className={` ${
                        Active_nav == "Articles"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full flex items-center gap-2 `}
                >
                    <img src={Articles_icon} className=" w-7" alt="" />
                    <span>Articles</span>
                </Link> */}
                {/* <Link
                    to={`/Doctores/${doctoreId}/Inbox`}
                    className={` ${
                        Active_nav == "Inbox"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full flex items-center gap-2 `}
                >
                    <img src={inbox_icon} className=" w-7" alt="" />
                    <span>Inbox</span>
                </Link> */}
                <Link
                    to={`/Doctores/${doctoreId}/Settings`}
                    className={` ${
                        Active_nav == "Settings"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full flex items-center gap-2 `}
                >
                    <img src={Settings_icon} className=" w-7" alt="" />
                    <span>Settings</span>
                </Link>

                {/* <Link
          to={`/Doctores/${doctoreId}/Wallet`}
          className={` ${
            Active_nav == "Wallet"
              ? "bg-green text-perpol  px-4 "
              : "bg-white hover:text-green"
          }  transition-all duration-150  cursor-pointer py-1 select-none  w-[200px] rounded-full flex items-center gap-2 `}
        >
          <img src={Wallet_icon} className=" w-7" alt="" />
          <span>Wallet</span>
        </Link> */}
            </div>
            <div className="pl-8 flex flex-col gap-3">
                <Link
                    to="/"
                    className={` ${
                        Active_nav == "Home"
                            ? "bg-green text-perpol  px-4 "
                            : "bg-white hover:text-green"
                    }  transition-all duration-150  cursor-pointer py-1 select-none
                      w-[200px] rounded-full flex items-center gap-2 `}
                >
                    <IoHomeOutline className="text-2xl  " /> <span>Home</span>
                </Link>
                <div>
                    {LogoutClicked ? (
                        <div className="w-full ">
                            <span className="small-loader font-bold  w-full m-auto"></span>
                        </div>
                    ) : (
                        <div
                            className="cursor-pointer w-full 
                                    flex items-center gap-2 text-red-500"
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            <TbLogout2 className="  text-xl" />
                            Logout
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Laptop;
