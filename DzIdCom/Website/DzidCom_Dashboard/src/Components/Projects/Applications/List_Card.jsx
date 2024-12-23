import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from "react-router";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import user_default from "../../../../public/user_default2.png";
import { IoIosAddCircle } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function List_Card({ user, projectId, application }) {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        return (
            <div className=" py-4 px-8 max-w-[300px] border shadow-md rounded-lg">
                <div className="flex flex-row  items-start justify-around  ">
                    <div className="  flex  justify-center max-w-[350px] gap-6">
                        {" "}
                        {user?.profile_pic_link ? (
                            <img
                                src={
                                    "http://localhost:3000/" +
                                    user.profile_pic_link
                                }
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = user_default;
                                }}
                                alt=""
                                className=" w-[100px]  object-cover rounded-full "
                            />
                        ) : (
                            <img
                                src={user_default}
                                alt=""
                                className=" w-16  object-cover"
                            />
                        )}
                        <div className=" flex items-center justify-center flex-col mb-6">
                            <div className=" text-sm font-semibold mb-4 text-gray_v">
                                <span>{user?.firstName}</span>{" "}
                                <span>{user?.lastName}</span>
                            </div>

                            <div className=" flex  gap-4 w-full ">
                                {user?.Rate ? (
                                    <>
                                        <div className=" text-yellow-400 flex gap-1">
                                            {[
                                                ...Array(Math.floor(user.Rate)),
                                            ].map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                            {user.Rate % 1 !== 0 && (
                                                <FaStarHalf />
                                            )}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" text-md font-semibold text-gray_v pt-3 text-center">
                    {user?.JobTitle}
                </div>
                <div className=" pt-6">
                    <div className=" text-sm font-semibold text-gray_v  ">
                        Budget :{" "}
                        {application?.Freelancer_Budget
                            ? application?.Freelancer_Budget
                            : "not set"}
                    </div>
                    <div className=" text-sm font-semibold text-gray_v ">
                        Deadline :{" "}
                        {application?.Freelancer_Time_Needed
                            ? application?.Freelancer_Time_Needed
                            : "not set"}
                    </div>
                </div>

                <div
                    className=" w-full rounded-xl text-sm font-semibold text-center
                 cursor-pointer
                text-white bg-perpol_v py-2 mt-4"
                    onClick={() => {
                        navigate(
                            `/Projects_Applications/${projectId}/${user.id}`
                        );
                    }}
                >
                    View Profile
                </div>
            </div>
        );
    }
}

export default List_Card;
