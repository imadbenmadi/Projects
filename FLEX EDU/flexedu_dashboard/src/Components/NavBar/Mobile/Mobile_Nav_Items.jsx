import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import { GoHome } from "react-icons/go";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaRegComment } from "react-icons/fa6";
import { BiMessageDetail } from "react-icons/bi";
import { PiListFill } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { IoMdPaper } from "react-icons/io";

function Mobile_Nav_Items({ MobileNav_Open, Toogle_Menu_Bar }) {
    const Navigate = useNavigate();
    const { set_Auth } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);
    const handleLogout = async () => {
        setLogoutClicked(true);
        try {
            // Send a request to the logout endpoint on the server
            const response = await axios.post(
                "http://localhost:3000/logout",
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 204) {
                set_Auth(false);
                Swal.fire("Success!", `Logged Out Successfully`, "success");
                Navigate("/Login");
            } else {
                Swal.fire("Error!", `Something Went Wrong ,`, "error");
            }
        } catch (error) {
            Swal.fire("Error!", `Something Went Wrong `, "error");
        }
        setLogoutClicked(false);
    };
    return (
        <div className="flex md:hidden">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]
                  z-50    text-black_text  bg-white `}
            >
                <div className="flex flex-col gap-8 text-sm text-gray_v pl-8 py-4 h-screen overflow-auto">
                    <div>
                        <div className=" font-semibold pb-4 flex items-center gap-2">
                            <GoHome className=" text-lg" />
                            Home
                        </div>
                        <div className=" flex flex-col gap-2 pl-2  ">
                            <Link
                                to={"/Home"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Home"
                                        ? "bg-blue_v text-gray_v px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Home</span>
                            </Link>
                            <Link
                                to={"/Users"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Users"
                                        ? "bg-blue_v text-gray_v px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Users</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className=" font-semibold pb-4  flex gap-2 items-center ">
                            <MdOutlineWorkOutline className=" text-lg" />
                            Courses
                        </div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Courses"}
                                className={` ${
                                    Active_nav == "Courses"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Courses</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className=" font-semibold pb-4  flex gap-2 items-center ">
                            <IoMdPaper className=" text-lg" />
                            Summaries
                        </div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Summaries"}
                                className={` ${
                                    Active_nav == "Summaries"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Summaries</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className=" font-semibold pb-4  flex gap-2 items-center ">
                            <MdPayment className=" text-lg" />
                            Payment
                        </div>
                        <div className=" flex flex-col  gap-2 pl-2 ">
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Courses_Payment"}
                                className={` ${
                                    Active_nav == "Courses_Payment"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[180px] rounded-full  `}
                            >
                                <span>Courses Payment</span>
                            </Link>
                        </div>
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Summaries_Payment"}
                                className={` ${
                                    Active_nav == "Summaries_Payment"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[180px] rounded-full  `}
                            >
                                <span>Summaries Payment</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className=" font-semibold pb-4 flex items-center gap-2">
                            <RiContactsLine className=" text-lg" />
                            Contact
                        </div>{" "}
                        <div className=" flex flex-col gap-2 pl-2  ">
                            <Link
                                to={"/Contact"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Contact"
                                        ? "bg-blue_v text-gray_v px-4 "
                                        : "bg-white hover:text-green_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span> Messages</span>
                            </Link>
                        </div>
                    </div>
                    <div className="pb-20">
                        {LogoutClicked ? (
                            <div className="w-full ">
                                <span className="small-loader font-bold  w-full m-auto"></span>
                            </div>
                        ) : (
                            <div
                                className="cursor-pointer w-full 
                                    flex items-center gap-3 text-red-500"
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
        </div>
    );
}

export default Mobile_Nav_Items;
