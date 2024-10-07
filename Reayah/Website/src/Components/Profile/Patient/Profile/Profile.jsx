import React from "react";
import { useAppContext } from "../../../../AppContext";
import { FaCircleUser } from "react-icons/fa6";
import image_not_found from "../../../../../public/image_not_found.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";

function Profile() {
    const { user } = useAppContext();
    return (
        <div className=" min-h-screen flex flex-col pt-12 gap-12 items-center">
            <div className=" w-fit flex flex-col items-cnter justify-center">
                {user?.picture ? (
                    <img
                        className=" w-24 h-24 border-4 object-cover
                         border-t-green border-l-green border-r-green rounded-full
                          border-b-transparent  text-gray_white flex items-center justify-center"
                        src={`https://api.reayahmed.com/${user?.picture}`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = image_not_found;
                        }}
                        alt=""
                    />
                ) : (
                    <div
                        className=" w-24 h-24  border-4 border-t-green
                     border-l-green border-r-green rounded-full border-b-transparent
                      text-8xl text-gray_white flex items-center justify-center mx-auto "
                    >
                        <FaCircleUser />
                    </div>
                )}
                <div className=" text-xl font-semibold text-gray pt-4 text-center">
                    {user?.full_name}
                </div>
            </div>

            <div className=" w-[310px] flex flex-col gap-6 border-2 border-perpol bg-perpol bg-opacity-10 p-6 rounded-lg">
                <div className=" flex items-center gap-4">
                    <FaMapMarkerAlt className=" text-2xl text-gray" />
                    <div className="  text-gray">
                        <div className=" text-perpol text-lg">Location</div>
                        <div className=" text-md font-semibold">
                            {user?.address ? user?.address : "Not Set"}
                        </div>
                    </div>
                </div>
                <div className=" flex items-center gap-4">
                    <FiUser className=" text-2xl text-gray" />
                    <div className="  text-gray">
                        <div className=" text-perpol text-lg">Gender</div>
                        <div className=" text-md font-semibold">
                            {user?.gender
                                ? user.gender === "M"
                                    ? "Male"
                                    : user.gender === "F"
                                    ? "Female"
                                    : "Not Set"
                                : "Not Set"}
                        </div>
                    </div>
                </div>
                <div className=" flex items-center gap-4">
                    <IoCalendarOutline className=" text-2xl text-gray" />
                    <div className="  text-gray">
                        <div className=" text-perpol text-lg">
                            Date of birth
                        </div>

                        <div className=" text-md font-semibold">
                            {user?.date_of_birth
                                ? user?.date_of_birth
                                : "Not Set"}{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
