import { Link } from "react-router-dom";
import { useAppContext } from "../../../../../AppContext"; // Import your context hook
import { TbLogout } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import Appointments_icon from "../../../../../../public/Profiles/Nav/Appointments.svg";
import Medical_Folders from "../../../../../../public/Profiles/Nav/Medical_Folders.svg";
import Consultation from "../../../../../../public/Profiles/Nav/Consultation.svg";
import inbox_icon from "../../../../../../public/Profiles/Nav/inbox.svg";
import Settings_icon from "../../../../../../public/Profiles/Nav/Settings.svg";
import { IoHomeOutline } from "react-icons/io5";

function Mobile_Nav_Items({
    MobileNav_Open,
    Toogle_Menu_Bar,
    Logout,
    LogoutClicked,
    Active_nav,
}) {
    const { isAuth, _id, user } = useAppContext();
    const patientId = window.localStorage.getItem("patientId");
    const doctorId = window.localStorage.getItem("doctorId");
    return (
        <div className="flex md:hidden border-t border-gray_white">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " -translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]  z-50 bg-white   text-perpol font-semibold `}
            >
                <div className=" w-[90%] ml-6 h-screen text-xl  mt-12 ">
                    <div className=" flex flex-col justify-between h-[80%] ">
                        <div>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${patientId}/Profile`}
                                className={`select-none flex items-center gap-2 mb-4  ml-6 mt-6 ${
                                    Active_nav === "Profile"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <FiUser className=" text-2xl" />
                                Profile
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${patientId}/Appoints`}
                                className={`select-none flex items-center gap-2 mb-4  ml-6 mt-6 ${
                                    Active_nav === "Appoints"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img
                                    src={Appointments_icon}
                                    className="  w-7"
                                />
                                Appointments
                            </Link>

                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${patientId}/Medical_Folders`}
                                className={`select-none flex items-center   gap-2 mb-4  ml-6 mt-6
                        ${
                            Active_nav === "Medical_Folders"
                                ? " bg-green px-3 w-fit rounded-full py-1"
                                : "text-perpol hover:text-perpol "
                        }`}
                            >
                                <img src={Medical_Folders} className="  w-7" />{" "}
                                <span>Medical Folders</span>
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${user?.id}/Consultations`}
                                className={`select-none flex items-center  gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Consultations"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={Consultation} className="  w-7" />{" "}
                                Consultations{" "}
                            </Link>
                            {/* <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${user?.id}/Inbox`}
                                className={`select-none flex items-center   gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Inbox"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={inbox_icon} className="  w-7" /> Inbox
                            </Link> */}
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={`/Patients/${user?.id}/Settings`}
                                className={`select-none flex items-center   gap-2  mb-4  ml-6 mt-6 ${
                                    Active_nav === "Settings"
                                        ? " bg-green px-3 w-fit rounded-full py-1"
                                        : "text-perpol hover:text-perpol "
                                }`}
                            >
                                <img src={Settings_icon} className="  w-7" />{" "}
                                Settings
                            </Link>
                        </div>
                        <div className=" flex flex-col gap-6">
                            <div>
                                <Link
                                    to="/"
                                    className="text-perpol flex items-center gap-2 ml-6"
                                >
                                    <IoHomeOutline />
                                    Home
                                </Link>
                            </div>
                            <div>
                                <>
                                    {!LogoutClicked ? (
                                        <div
                                            className="text-perpol   flex items-center  gap-2   ml-6 "
                                            onClick={() => {
                                                Logout();
                                            }}
                                        >
                                            <TbLogout />
                                            Logout
                                        </div>
                                    ) : (
                                        <div className=" w-full flex items-center justify-center   text-perpol">
                                            <span className="small-loader"></span>
                                        </div>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>

                    {/* <div className=" w-full rounded-xl ml-6 mt-6 h-[2px]  bg-gray_white mb-4"></div> */}
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
