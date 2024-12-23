import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import message_icon from "../../../../public/Profile/message.png";
import notification_icon from "../../../../public/Profile/Notification.png";
import user_default from "../../../../public/Profile/user_default2.png";
import { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { useAppContext } from "../../../AppContext";
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
function Laptop_Nav_Items({
    isProfileCompleted,
    Active_nav,
    handleLogout,
    LogoutClicked,
}) {
    const Navigate = useNavigate();
    const { user, Notifications, set_Notifications } = useAppContext();
    const [ProfileClicked, setProfileClicked] = useState(false);
    const toogleProfile = () => {
        setopen_Notifications(false);
        setProfileClicked(!ProfileClicked);
    };
    const [open_Notifications, setopen_Notifications] = useState(false);
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
            `http://localhost:3000/Clients/${user?.id}/Notifications/${id}`,

            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
    };

    return (
        <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 ">
            <div>
                <Link to={"/Client"} className="select-none">
                    <img
                        src={Logo}
                        alt="Logo"
                        className=" w-[100px] lg:w-[135px] "
                    />
                </Link>
            </div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Complete_Profile"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link
                        to={"/Client/Complete_Profile"}
                        className={"select-none"}
                    >
                        {isProfileCompleted ? (
                            <span className=" relative">
                                Edite profile{" "}
                                {/* {!isProfileCompleted ? (
                                    <span className=" absolute top-[-3px] right-[-9px] h-3 w-3 rounded-full bg-red-500 "></span>
                                ) : null} */}
                            </span>
                        ) : (
                            <span className=" relative">
                                Complete profile{" "}
                                {/* {!isProfileCompleted ? ( */}
                                <span className=" absolute top-[-3px] right-[-9px] h-3 w-3 rounded-full bg-red-500 "></span>
                                {/* ) : null} */}
                            </span>
                        )}
                    </Link>
                </div>

                <div
                    className={` ${
                        Active_nav == "Profile"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Client/Profile"} className={" select-none"}>
                        Profil{" "}
                    </Link>
                </div>
                {isProfileCompleted && (
                    <>
                        <div
                            className={` ${
                                Active_nav == "Projects"
                                    ? "text-perpol_v"
                                    : "text-black_text"
                            } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                        >
                            <Link
                                to={"/Client/Projects"}
                                className=" select-none"
                            >
                                Projects
                            </Link>
                        </div>
                        {/* <div
                            className={` ${
                                Active_nav == "Process"
                                    ? "text-perpol_v"
                                    : "text-black_text"
                            } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                        >
                            <Link
                                to={"/Client/Process"}
                                className="  select-none"
                            >
                                Process
                            </Link>
                        </div> */}
                    </>
                )}
            </div>
            <div className=" flex items center justify-center gap-5">
                {isProfileCompleted ? (
                    <div className="flex items-center justify-center gap-6 ">
                        <Link
                            to={"/Client/rooms"}
                            onClick={() => {
                                setopen_Notifications(false);
                                setProfileClicked(false);
                            }}
                        >
                            <img src={message_icon} alt="" />
                        </Link>
                        <div className="relative">
                            {Notifications?.length > 0 && (
                                <div className=" w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0 "></div>
                            )}
                            <img
                                src={notification_icon}
                                alt=""
                                className=" cursor-pointer"
                                onClick={toogleopen_Notifications}
                            />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className=" relative">
                    {user?.profile_pic_link ? (
                        <img
                            src={user?.profile_pic_link}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = user_default;
                            }}
                            alt="pic"
                            className=" w-8 cursor-pointer"
                            onClick={toogleProfile}
                        />
                    ) : (
                        <img
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
                            <div
                                className="text-black_text cursor-pointer w-[80px] "
                                onClick={() => {
                                    setProfileClicked(false);
                                }}
                            >
                                <div
                                    className=" select-none flex items-center gap-2 "
                                    onClick={() => {
                                        Navigate("/Client/Profile");
                                        // window.location.href =
                                        //     "/Client/Profile";
                                    }}
                                >
                                    <FiUser className="  text-xl " />
                                    Profil
                                </div>
                            </div>
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
                                        Logout
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
                                Notifications
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
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
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
                </div>{" "}
            </div>
        </div>
    );
}

export default Laptop_Nav_Items;
