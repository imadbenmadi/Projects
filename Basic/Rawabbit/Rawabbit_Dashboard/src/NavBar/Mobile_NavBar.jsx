import { useEffect } from "react";
import { TbWorld } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { HiMiniUsers } from "react-icons/hi2";
import swal from "sweetalert2";
import { MdSpaceDashboard } from "react-icons/md";

function Navbar({ Active_nav, setActive_nav, openNav, SetOpenNav, userId }) {
    const Navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    return (
        <div className=" w-full text-white shrink-0 h-full overflow-y-auto custom-overflow">
            {openNav ? (
                <>
                    <IoClose
                        className=" text-4xl text-green  mb-8 cursor-pointer mt-6 text-center m-auto"
                        onClick={() => SetOpenNav(false)}
                    />
                    <div className=" flex flex-col gap-16 ml-4">
                        {/* nav items */}
                        <Link
                            to={"/"}
                            onClick={() => SetOpenNav(false)}
                            className={` flex items-center cursor-pointer ${
                                !location.pathname.split("/")[1] &&
                                "text-green "
                            }`}
                        >
                            <MdSpaceDashboard />
                            <div>Dashboard</div>
                        </Link>
                        <Link
                            to={"/Websites"}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Websites" && "text-green"
                            }`}
                        >
                            <TbWorld />
                            <div>Websites</div>
                        </Link>
                        <Link
                            to={`/Users`}
                            onClick={() => SetOpenNav(false)}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Users" && "text-green"
                            } ${Active_nav !== "Users" ? "text-white" : ""}`}
                        >
                            <HiMiniUsers />
                            <div>Users</div>
                        </Link>
                        <Link
                            to={"/Requests"}
                            className={`select-none flex items-center gap-1 cursor-pointer ${
                                Active_nav == "Requests" && "text-green"
                            }`}
                        >
                            <IoIosPaper />
                            <div>Requests</div>
                        </Link>
                    </div>
                </>
            ) : (
                <div className=" flex flex-col items-center justify-center gap-10 text-xl">
                    <IoMenu
                        className=" text-4xl text-green  cursor-pointer mt-6"
                        onClick={() => SetOpenNav(true)}
                    />
                    {/* <div className=" w-full h-[1px] bg-white"></div> */}
                    {/* nav items */}

                    <Link
                        to={"/"}
                        onClick={() => SetOpenNav(false)}
                        className={` flex items-center cursor-pointer ${
                            !location.pathname.split("/")[1] && "text-green "
                        }`}
                    >
                        <MdSpaceDashboard />
                    </Link>
                    <Link
                        to={"/Websites"}
                        onClick={() => SetOpenNav(false)}
                        className={`select-none flex items-center gap-1 cursor-pointer ${
                            Active_nav == "Websites" && "text-green"
                        }`}
                    >
                        <TbWorld />
                    </Link>
                    <Link
                        to={`/Users`}
                        onClick={() => SetOpenNav(false)}
                        className={`select-none flex items-center gap-1 cursor-pointer ${
                            Active_nav == "Users" && "text-green"
                        } ${Active_nav !== "Users" ? "text-white" : ""}`}
                    >
                        <HiMiniUsers />
                    </Link>
                    <Link
                        to={"/Requests"}
                        className={`select-none flex items-center gap-1 cursor-pointer ${
                            Active_nav == "Requests" && "text-green"
                        }`}
                    >
                        <IoIosPaper />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
