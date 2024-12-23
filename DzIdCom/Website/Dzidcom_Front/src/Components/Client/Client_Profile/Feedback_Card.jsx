import React from "react";
import { IoIosStar } from "react-icons/io";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
function Card({ feedback, Feedbacks, setFeedbacks }) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [add_to_home_Loading, setadd_to_home_Loading] = useState(false);
    const [show_more, setShow_more] = useState(false);
    const Toogle_Show_More = () => {
        setShow_more(!show_more);
    };

    return (
        <div
            key={feedback?.id}
            className="flex flex-col md;flex-row justify-between py-4 px-7  border-2 
                         border-perpol_v rounded-lg  mt-6 text-gray_v"
        >
            <div className="w-full md:w-full shrink-0">
                <div className="flex gap-4 ">
                    <div className="text-lg font-semibold">
                        <img
                            src={
                                "http://localhost:3000" +
                                feedback?.Freelancer?.profile_pic_link
                            }
                            className=" w-20 h-20 rounded-full  object-cover"
                            alt=""
                        />
                        {}
                    </div>
                    <div className=" pt-4">
                        <div className=" flex gap-1">
                            <IoIosStar
                                className={` cursor-pointer ${
                                    feedback?.Rate >= 1
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    feedback?.Rate >= 2
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    feedback?.Rate >= 3
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    feedback?.Rate >= 4
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    feedback?.Rate == 5
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                            />
                        </div>
                        <div className="text-sm pt-1  font-semibold">
                            {feedback?.Freelancer?.firstName}
                        </div>
                    </div>
                </div>
                <div className=" font-semibold text-gray_v py-6 md:px-4 break-all">
                    {show_more ? (
                        <div className=" flex flex-col ">
                            {feedback?.Comment}
                            <span
                                onClick={Toogle_Show_More}
                                className=" text-perpol_v cursor-pointer flex items-center gap-1  "
                            >
                                {" "}
                                Show Less <FaAngleUp />
                            </span>
                        </div>
                    ) : (
                        <div className=" flex flex-col ">
                            <div>{feedback?.Comment.slice(0, 500)}</div>
                            {feedback?.Comment.length > 500 && (
                                <div
                                    onClick={Toogle_Show_More}
                                    className=" text-perpol_v cursor-pointer flex items-center gap-1  "
                                >
                                    {" "}
                                    Show More <FaAngleDown />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
