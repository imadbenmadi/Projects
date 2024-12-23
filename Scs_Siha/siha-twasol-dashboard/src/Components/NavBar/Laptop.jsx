import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import { GoHome } from "react-icons/go";
import { PiListFill } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";

function Laptop() {
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
                Swal.fire("Error!", "", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "", "error");
        }
        setLogoutClicked(false);
    };
    return (
        <div className="flex flex-col gap-8 text-sm text-gray_v pl-8 py-4">
            <div className=" flex flex-col items-center justify-center text-gray_v">
                <img src={Logo} alt="Logo" className="w-16 " />
                {/* <div className="text-sm text-white font-semibold">Admin Panel</div> */}
            </div>
            <div>
                <div className=" font-semibold pb-4  flex gap-2 items-center ">
                    <GoHome className=" text-lg" />
                    Home
                </div>
                <div className=" flex flex-col gap-2 pl-2  ">
                    <Link
                        to={"/Home"}
                        className={` ${
                            Active_nav == "Home"
                                ? "bg-blue_v text-white px-4 "
                                : "bg-white hover:text-blue_v text-gray_v"
                        }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full `}
                    >
                        <span>Statistics</span>
                    </Link>
                    <Link
                        to={"/Users"}
                        className={` ${
                            Active_nav == "Users"
                                ? "bg-blue_v text-white px-4 "
                                : "bg-white hover:text-blue_v text-gray_v"
                        }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                    >
                        <span>Users</span>
                    </Link>
                </div>
            </div>
            <div>
                <div className=" font-semibold pb-4  flex gap-2 items-center ">
                    {/* <FaRegBuilding className=" text-lg" /> */}
                    Medical Institustions
                </div>
                <div className=" flex flex-col gap-2 pl-2 ">
                    <Link
                        to={"/Institustions"}
                        className={` ${
                            Active_nav == "Institustions"
                                ? "bg-blue_v text-white px-4 "
                                : "bg-white hover:text-blue_v text-gray_v"
                        }  transition-all duration-150  cursor-pointer py-1 select-none  
                        w-[150px] rounded-full flex items-center gap-2  `}
                    >
                        <FaRegBuilding className=" text-lg" />
                        <span>Institustions</span>
                    </Link>

                    <Link
                        to={"/New_institution"}
                        className={` ${
                            Active_nav == "New_institution"
                                ? "bg-blue_v text-white px-4 "
                                : "bg-white hover:text-blue_v text-gray_v"
                        }  transition-all duration-150  cursor-pointer py-1 select-none  w-[180px] rounded-full flex items-center gap-2  `}
                    >
                        <MdOutlineAddCircleOutline className=" text-lg" />
                        <span> new institution</span>
                    </Link>
                </div>
            </div>

            {/* <div>
                <div className=" font-semibold pb-4  flex gap-2 items-center ">
                    <PiListFill className=" text-lg" />
                    Terms
                </div>
                <div className=" flex flex-col gap-2 pl-2 ">
                    <Link
                        to={"/Terms"}
                        className={` ${
                            Active_nav == "Terms"
                                ? "bg-blue_v text-white px-4 "
                                : "bg-white hover:text-blue_v text-gray_v"
                        }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                    >
                        <span>Terms of service</span>
                    </Link>
                </div>
            </div> */}
            <div>
                <div className=" font-semibold pb-4  flex gap-2 items-center ">
                    <RiContactsLine className=" text-lg" />
                    Contact
                </div>{" "}
                <div className=" flex flex-col gap-2 pl-2  ">
                    <Link
                        to={"/Contact"}
                        className={` ${
                            Active_nav == "Contact"
                                ? "bg-blue_v text-white px-4 "
                                : "bg-white hover:text-blue_v text-gray_v"
                        }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                    >
                        <span> Messages</span>
                    </Link>
                </div>
            </div>
            <div className="pb-6">
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
    );
}

export default Laptop;
