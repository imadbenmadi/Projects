import React from "react";
import { useState } from "react";
import Menu_Toogler from "./Menu_Toogler";
import Mobile_Nav_Items from "./Mobile_Nav_Items";
import { Link } from "react-router-dom";
import Logo from "../../../../../public/Logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import notification_icon from "../../../../../public/Notification.png";
function Mobile_Nav({ Active_nav, handleLogout, LogoutClicked }) {
    const Navigate = useNavigate();
    const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    function Toogle_Menu_Bar({ Active_nav }) {
        set_MobileNav_Open(!MobileNav_Open);
    }
    const { user, Notifications, set_Notifications, set_Messages } =
        useAppContext();
    const [open_Notifications, setopen_Notifications] = useState(false);

    const toogleopen_Notifications = () => {
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
        <div className=" md:hidden relative h-[60px] ">
            <div
                className=" flex gap-5 items-center justify-between mx-3 md:hidden 
            h-full bg-white border-b"
            >
                <div>
                    <img src={Logo} alt="Logo" className=" w-[50px] " />
                </div>
                <div className=" flex items-center justify-center gap-4 md:gap-6">
                    <div>
                        <img
                            loading="lazy"
                            src={notification_icon}
                            alt=""
                            onClick={toogleopen_Notifications}
                            className=" shrink-0 w-full"
                        />
                    </div>
                    <Menu_Toogler
                        MobileNav_Open={MobileNav_Open}
                        set_MobileNav_Open={set_MobileNav_Open}
                        Toogle_Menu_Bar={Toogle_Menu_Bar}
                    />
                </div>
            </div>
            <Mobile_Nav_Items
                MobileNav_Open={MobileNav_Open}
                Toogle_Menu_Bar={Toogle_Menu_Bar}
                Active_nav={Active_nav}
                handleLogout={handleLogout}
                LogoutClicked={LogoutClicked}
            />
            {open_Notifications ? (
                <div
                    className="absolute  bottom-[100%] top-[60px] right-[10px] bg-white shadow border  
                             rounded-lg   z-40  w-[300px] h-[calc(100vh-150px)] 
                             overflow-y-auto custom-overflow"
                >
                    <div className=" text-gray_v py-2 px-7 text-md font-semibold border-b">
                        الاشعارات
                    </div>
                    <div>
                        {Notifications?.length > 0 ? (
                            Notifications.map((notification) => (
                                <div
                                    onClick={() => {
                                        Delete_Notification(notification.id);
                                        Navigate(notification.link);
                                        setopen_Notifications(false);
                                    }}
                                    key={notification.id}
                                    className="flex items-center gap-3 py-1 px-3 border-b cursor-pointer hover:bg-gray-100"
                                >
                                    <div className=" flex gap-2 ">
                                        <IoMdNotificationsOutline className="shrink-0 mt-2" />
                                        <div>
                                            <div className="text-black_text font-semibold">
                                                {notification?.title}
                                            </div>
                                            <div className="text-gray_v text-sm">
                                                {notification?.text}
                                            </div>
                                            <div className="text-gray_v text-xs pt-1">
                                                

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
        </div>
    );
}

export default Mobile_Nav;
