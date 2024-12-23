import { useEffect } from "react";
import logo from "../../public/skate_circle.png";

import { TbWorld } from "react-icons/tb";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBook } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Laptop_NavBar({ Active_nav, setActive_nav }) {
    const Navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);
    return (
        <div className=" w-full h-full overflow-auto custom-overflow">
            <div className=" flex  items-center text-xl md:text-4xl text-white  justify-center pt-4 ">
                <div className=" ">Rawabbit</div>
            </div>
            <div className=" w-full h-[1px] bg-white my-6"></div>
            {/* nav items */}

            <div className=" w-[95%]  md:w-[80%] m-auto text-white text-sm md:text-xl  lg:text-3xl flex flex-col gap-20 mt-8">
                <Link
                    to={"/"}
                    className={` flex items-center cursor-pointer ${
                        !location.pathname.split("/")[1] && "text-green "
                    }`}
                >
                    <MdSpaceDashboard />
                    <div>Dashboard</div>
                </Link>
                <Link
                    to={"/Websites"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Websites" && "text-green"
                    }`}
                >
                    <TbWorld />
                    <div>Websites</div>
                </Link>
                <Link
                    to={"/Users"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Users" && "text-green"
                    }`}
                >
                    <HiMiniUsers />
                    <div>Users</div>
                </Link>

                <Link
                    to={"/Requests"}
                    className={`select-none flex items-center gap-3 cursor-pointer ${
                        Active_nav == "Requests" && "text-green"
                    }`}
                >
                    <IoIosPaper />
                    <div>Requests</div>
                </Link>
            </div>
        </div>
    );
}

export default Laptop_NavBar;
