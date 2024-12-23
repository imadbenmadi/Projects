import React from "react";
import { useState } from "react";
import Menu_Toogler from "./Menu_Toogler";
import Mobile_Nav_Items from "./Mobile_Nav_Items";
import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import message_icon from "../../../../public/Profile/message.png";
import notification_icon from "../../../../public/Profile/Notification.png";
import { useNavigate } from "react-router-dom";
import Project_Accepted_Notification from "../../../../public/Notifications/Project_Accepted.png";
import Projet_refused_Notification from "../../../../public/Notifications/Projet_refused.png";
import Freelancer_found_Notification from "../../../../public/Notifications/Freelancer_found.png";
import payment_accepted_Notification from "../../../../public/Notifications/payment_accepted.png";
import payment_rejected_Notification from "../../../../public/Notifications/payment_rejected.png";
import Freelancer_uploaded_work_Notification from "../../../../public/Notifications/Freelancer_uploaded_work.png";
import { IoMdNotificationsOutline } from "react-icons/io";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import axios from "axios";
import { useAppContext } from "../../../AppContext";

function Mobile_Nav({
    isProfileCompleted,
    Active_nav,
    handleLogout,
    LogoutClicked,
}) {
    const Navigate = useNavigate();
    const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    function Toogle_Menu_Bar({ Active_nav }) {
        set_MobileNav_Open(!MobileNav_Open);
    }
    const { user, Notifications, set_Notifications } = useAppContext();
    const [open_Notifications, setopen_Notifications] = useState(false);
    const toogleopen_Notifications = () => {
        setopen_Notifications(!open_Notifications);
    };
    const Delete_Notification = (id) => {
        const newNotifications = Notifications.filter(
            (notification) => notification.id !== id
        );
        set_Notifications(newNotifications);
        axios
            .delete(
                `https://api.dzidcom.com/Freelancers/${user?.id}/Notifications/${id}`,

                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            )
            .then((res) => {})
            .catch((err) => {});
    };
    return (
        <div className=" md:hidden relative h-[60px] border-b">
            <div className=" h-full flex gap-5 items-center justify-between mx-3 md:hidden  bg-white">
                <div>
                    <Link to={"/"} className="select-none">
                        <img
                            src={Logo}
                            alt="Logo"
                            className=" w-[110px] lg:w-[145px] "
                        />
                    </Link>
                </div>
                <div className=" flex items-center justify-center gap-4 md:gap-6">
                    {isProfileCompleted && (
                        <>
                            <Link
                                to={"/Freelancer/rooms"}
                                onClick={() => {
                                    setopen_Notifications(false);
                                    set_MobileNav_Open(false);
                                }}
                            >
                                <img src={message_icon} alt="" />
                            </Link>
                            <div>
                                <img
                                    src={notification_icon}
                                    alt=""
                                    onClick={toogleopen_Notifications}
                                />
                            </div>
                        </>
                    )}
                    <Menu_Toogler
                        MobileNav_Open={MobileNav_Open}
                        set_MobileNav_Open={set_MobileNav_Open}
                        Toogle_Menu_Bar={Toogle_Menu_Bar}
                    />
                </div>
            </div>
            <Mobile_Nav_Items
                isProfileCompleted={isProfileCompleted}
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
                        Notifications
                    </div>
                    <div>
                        {Notifications?.length > 0 ? (
                            Notifications.map((notification) => (
                                <div
                                    onClick={() => {
                                        Delete_Notification(notification.id);
                                        Navigate(notification.link);
                                        setopen_Notifications(false);
                                        setProfileClicked(false);
                                    }}
                                    key={notification.id}
                                    className="flex items-center gap-3 py-1 px-3 border-b cursor-pointer hover:bg-gray-100"
                                >
                                    <div className=" flex gap-2 ">
                                        {notification.type ==
                                        "Project_Accepted" ? (
                                            <img
                                                src={
                                                    Project_Accepted_Notification
                                                }
                                                className=" w-fit h-fit"
                                                alt=""
                                            />
                                        ) : notification.type ==
                                          "Projet_refused" ? (
                                            <img
                                                src={
                                                    Projet_refused_Notification
                                                }
                                                className=" w-fit h-fit"
                                                alt=""
                                            />
                                        ) : notification.type ==
                                          "Freelancer_found" ? (
                                            <img
                                                src={
                                                    Freelancer_found_Notification
                                                }
                                                className=" w-fit h-fit"
                                                alt=""
                                            />
                                        ) : notification.type ==
                                          "payment_accepted" ? (
                                            <img
                                                src={
                                                    payment_accepted_Notification
                                                }
                                                className=" w-fit h-fit"
                                                alt=""
                                            />
                                        ) : notification.type ==
                                          "payment_rejected" ? (
                                            <img
                                                src={
                                                    payment_rejected_Notification
                                                }
                                                className=" w-fit h-fit"
                                                alt=""
                                            />
                                        ) : notification.type ==
                                          "Freelancer_uploaded_work" ? (
                                            <img
                                                src={
                                                    Freelancer_uploaded_work_Notification
                                                }
                                                className=" w-fit h-fit"
                                                alt=""
                                            />
                                        ) : (
                                            <IoMdNotificationsOutline />
                                        )}
                                        <div>
                                            <div className="text-black_text font-semibold">
                                                {notification?.title}
                                            </div>
                                            <div className="text-gray_v text-sm">
                                                {notification?.text}
                                            </div>
                                            <div className="text-gray_v text-xs pt-1">
                                                {/* {new Date(
                                                    notification?.createdAt
                                                ).toLocaleDateString()} */}
                                                {dayjs(
                                                    notification?.createdAt
                                                ).format("DD MMMM YYYY")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray_v pt-6 flex-gap-2 ">
                                No Notifications
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Mobile_Nav;
