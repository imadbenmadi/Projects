import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { FiUser } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

function Card({ Message, Messages, setMessages }) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [add_to_home_Loading, setadd_to_home_Loading] = useState(false);
    const [show_more, setShow_more] = useState(false);
    const Toogle_Show_More = () => {
        setShow_more(!show_more);
    };
    const handle_Delete_Message = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Admin/Contact/${Message?.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                const newMessages = Messages.filter(
                    (item) => item?.id !== Message?.id
                );
                setMessages(newMessages);
                Swal.fire("نجاح", "تم حذف الرسالة بنجاح", "success");
            } else if (response.status === 401) {
                Swal.fire(
                    "غير مصرح",
                    "يجب عليك تسجيل الدخول مرة أخرى",
                    "error"
                );
                Navigate("/Login");
            } else Swal.fire("خطأ", "حدث خطأ ما", "error");
        } catch (err) {
            Swal.fire("خطأ", "حدث خطأ ما", "error");
        } finally {
            setDeleteLoading(false);
        }

    };

    return (
        // <div></div>
        <div
            key={Message?.id}
            className="flex flex-col md;flex-row justify-between py-4 px-7  border-2 
                         border-blue_v rounded-lg  mt-6 text-gray_v"
        >
            <div className="w-full md:w-full shrink-0">
                <div className="flex flex-col gap-4  text-gray_v font-semibold text-sm ">
                    <div className=" flex items-center gap-2">
                        <FiUser className=" text-xl" />
                        {Message?.firstName + " " + Message?.lastName}
                    </div>
                    <div className=" flex items-center gap-2 ">
                        <MdOutlineMailOutline className=" text-xl" />

                        <a
                            href={`mailto:${Message?.email}`}
                            className="text-blue_v"
                        >
                            {Message?.email}
                        </a>
                    </div>
                </div>
                <div className=" font-semibold text-gray_v py-6 md:px-4 break-all">
                    {show_more ? (
                        <div className=" flex flex-col ">
                            {Message?.message}
                            <span
                                onClick={Toogle_Show_More}
                                className=" text-blue_v cursor-pointer flex items-center gap-1  "
                            >
                                {" "}
                                Show Less <FaAngleUp />
                            </span>
                        </div>
                    ) : (
                        <div className=" flex flex-col ">
                            <div>{Message?.message.slice(0, 500)}</div>
                            {Message?.message.length > 500 && (
                                <div
                                    onClick={Toogle_Show_More}
                                    className=" text-blue_v cursor-pointer flex items-center gap-1  "
                                >
                                    {" "}
                                    Show More <FaAngleDown />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className=" flex mx-auto text-center flex-col md:flex-row gap-3 w-fit pt-4 md:pt-0 md:w-fit shrink-0 ">
                {deleteLoading ? (
                    <div className=" small-loader mt-2 mr-10"></div>
                ) : (
                    <div
                        className=" cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg font-semibold"
                        onClick={() => {
                            handle_Delete_Message();
                        }}
                    >
                        Delete
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
