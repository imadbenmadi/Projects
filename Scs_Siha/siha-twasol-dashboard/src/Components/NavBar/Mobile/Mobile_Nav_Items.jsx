import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiListFill } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
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
                Swal.fire("Error!", "", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "", "error");
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
                <div className="flex flex-col gap-8 text-sm text-black_text pl-8 py-4 h-screen overflow-auto">
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
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-blue_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Home</span>
                            </Link>
                            <Link
                                to={"/Users"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Users"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-blue_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Users</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className=" font-semibold pb-4 flex items-center gap-2">
                            {/* <MdOutlineWorkOutline className=" text-lg" /> */}
                            Medical Institustions
                        </div>{" "}
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                to={"/Institustions"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Institustions"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-blue_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none 
                                flex items-center gap-2 
                                    w-[150px] rounded-full  `}
                            >
                                <FaRegBuilding className=" text-lg" />
                                <span>Institustions</span>
                            </Link>
                            <Link
                                to={"/New_institution"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "New_institution"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-blue_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none 
                                flex items-center gap-2 
                                    w-[180px] rounded-full  `}
                            >
                                <MdOutlineAddCircleOutline className=" text-lg" />

                                <span> new institution</span>
                            </Link>
                        </div>
                    </div>

                    {/* <div>
                        <div className=" font-semibold pb-4 flex items-center gap-2">
                            <PiListFill className=" text-lg" />
                            Terms
                        </div>{" "}
                        <div className=" flex flex-col gap-2 pl-2 ">
                            <Link
                                to={"/Terms"}
                                onClick={Toogle_Menu_Bar}
                                className={` ${
                                    Active_nav == "Terms"
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-blue_v"
                                }  transition-all duration-150  cursor-pointer py-1 select-none  w-[150px] rounded-full  `}
                            >
                                <span>Terms of service</span>
                            </Link>
                        </div>
                    </div> */}
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
                                        ? "bg-blue_v text-white px-4 "
                                        : "bg-white hover:text-blue_v"
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
