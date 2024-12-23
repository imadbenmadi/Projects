import { Link } from "react-router-dom";
import Logo from "../../../../../public/Logo.png";
import user_default from "../../../../../public/user_default2.png";
import { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { useAppContext } from "../../../../AppContext";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import notification_icon from "../../../../../public/Notification.png";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import axios from "axios";
function Laptop_Nav_Items({ Active_nav, handleLogout, LogoutClicked }) {
    const Navigate = useNavigate();
    const { user, Notifications, set_Messages, set_Notifications } =
        useAppContext();
    const [ProfileClicked, setProfileClicked] = useState(false);
    const [open_Notifications, setopen_Notifications] = useState(false);
    // const [Notifications_, set_Notifications] = useState([]);
    const toogleProfile = () => {
        setopen_Notifications(false);
        setProfileClicked(!ProfileClicked);
    };
    const toogleopen_Notifications = () => {
        setProfileClicked(false);
        setopen_Notifications(!open_Notifications);
    };
    const Delete_Notification = (id) => {
        const newNotifications = Notifications.filter(
            (notification) => notification.id !== id
        );
        set_Notifications(newNotifications);
        axios.delete(
            `http://localhost:3000/Malads/${user?.id}/Notifications/${id}`,

            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
    };

    return (
        <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 ">
            <div>
                <img
                    loading="lazy"
                    src={Logo}
                    alt="Logo"
                    className=" w-[50px]  "
                />
            </div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Profile"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Malad/Profile"} className={"select-none"}>
                        <span className=" relative">الحساب</span>
                    </Link>
                </div>
                <Link
                    className={` ${
                        Active_nav == "Companies"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer select-none`}
                    to={"/Malad/Companies"}
                >
                    <span className=" relative">المؤسسات الاستشفائية</span>
                </Link>
                <div
                    className={` ${
                        Active_nav == "ChatRooms"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Malad/ChatRooms"} className={" select-none"}>
                        المراسلة{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Blogs"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Malad/Blogs"} className=" select-none">
                        المقالات
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Events"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Malad/Events"} className=" select-none">
                        الاحداث
                    </Link>
                </div>
            </div>
            <div className=" flex items center justify-center gap-5">
                <div className="flex items-center justify-center gap-6 ">
                    <div className="flex items-center justify-center gap-6 relative">
                        <div className="relative">
                            {Notifications?.length > 0 && (
                                <div className=" w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0 "></div>
                            )}
                            <img
                                loading="lazy"
                                src={notification_icon}
                                alt=""
                                className=" cursor-pointer shrink-0 w-full"
                                onClick={toogleopen_Notifications}
                            />
                        </div>
                    </div>
                </div>
                <div className=" relative">
                    {user?.profile_pic_link ? (
                        <img
                            loading="lazy"
                            src={`http://localhost:3000/${user.profile_pic_link}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = user_default;
                            }}
                            alt="pic"
                            className=" w-8 cursor-pointer rounded-full object-cover"
                            onClick={toogleProfile}
                        />
                    ) : (
                        <img
                            loading="lazy"
                            src={user_default}
                            alt="pic"
                            className=" w-8 cursor-pointer"
                            onClick={toogleProfile}
                        />
                    )}

                    {ProfileClicked ? (
                        <div
                            className="absolute top-10 right-0 bg-white shadow border  
                    rounded-lg p-2 w-40 z-50 flex items-center  flex-col gap-3"
                        >
                            <div className="">
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
                                        تسجيل الخروج
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                    {open_Notifications ? (
                        <div
                            className="absolute top-10 right-0 bg-white shadow border  
                             rounded-lg   z-50   min-w-[500px] h-[calc(100vh-100px)] overflow-y-auto
                             custom-overflow
                             "
                        >
                            <div className=" text-gray_v py-2 px-7 text-md font-semibold border-b">
                                الاشعارات
                            </div>
                            <div>
                                {Notifications?.length > 0 ? (
                                    Notifications.map((notification) => (
                                        <div
                                            onClick={() => {
                                                Delete_Notification(
                                                    notification.id
                                                );
                                                Navigate(notification.link);
                                                setopen_Notifications(false);
                                                setProfileClicked(false);
                                            }}
                                            key={notification.id}
                                            className="flex items-center gap-3 py-1 px-3 border-b cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className=" flex w-full justify-between mx-3 gap-2 ">
                                                <IoMdNotificationsOutline className="shrink-0 mt-2 font-bold text-2xl" />
                                                <div>
                                                    <div className="text-black_text font-semibold">
                                                        {notification?.title}
                                                    </div>
                                                    <div className="text-gray_v text-sm">
                                                        {notification?.text}
                                                    </div>
                                                    <div className="text-gray_v text-xs pt-1">
                                                        dayjs(notification?.createdAt).format("DD-MMM-YYYY")
                                                        {dayjs(
                                                            notification?.createdAt
                                                        ).format("DD-MMM-YYYY")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray_v pt-6 flex-gap-2 ">
                                        لا يوجد اشعارات
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>{" "}
            </div>
        </div>
    );
}

export default Laptop_Nav_Items;
