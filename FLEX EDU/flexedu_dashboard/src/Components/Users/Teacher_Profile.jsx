import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from "react-router";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import user_default from "../../../public/user_default2.png";
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

function PersonalInformations({ user }) {
    return (
        <div className="  py-4 px-6 md:px-0 max-w-[750px] mx-auto  flex flex-col gap-6 md:gap-16 break-all ">
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        First Name :
                    </div>
                    <div>
                        {user?.firstName ? (
                            user?.firstName
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Last Name :
                    </div>
                    <div>
                        {user?.lastName ? (
                            user?.lastName
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Email :
                    </div>
                    <div>
                        {user?.email ? (
                            <a
                                className=" hover:text-gray-500"
                                href={`mailto:${user?.email}`}
                            >
                                {user?.email}
                            </a>
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>

            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Phone Number :
                    </div>
                    <div>
                        {user?.telephone ? (
                            user?.telephone
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" text-lg text-red-500 font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Password :
                    </div>
                    <div>
                        {user?.password ? (
                            user?.password
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>

            {user?.facebook_Link ||
            user?.instgram_Link ||
            user?.linkedIn_Link ? (
                <>
                    <div className=" flex justify-between">
                        <div className=" flex gap-6">
                            {user?.facebook_Link && (
                                <FaFacebook
                                    className=" text-blue-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user?.facebook_Link;
                                    }}
                                />
                            )}
                            {user?.instgram_Link && (
                                <FaInstagram
                                    className=" text-red-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user?.instagram_Link;
                                    }}
                                />
                            )}
                            {user?.linkedIn_Link && (
                                <FaLinkedin
                                    className=" text-blue-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user?.linkedin_Link;
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : null}

            <div className=" w-full bg-gray_white h-[1px]"> </div>
        </div>
    );
}
function Hero({ user }) {
    const Navigate = useNavigate();
    return (
        <div className="flex flex-row  items-start justify-around pb-10 ">
            <div className="  flex flex-col  justify-center max-w-[350px] gap-6 md:gap-12">
                {user?.profile_pic_link ? (
                    <img
                        src={"http://localhost:3000/" + user?.profile_pic_link}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = user_default;
                        }}
                        alt="Logo"
                        className=" w-[150px]  object-cover rounded-full"
                    />
                ) : (
                    <img
                        src={user_default}
                        alt=""
                        className=" w-32 object-cover"
                    />
                )}
            </div>
        </div>
    );
}

function Teacher_Profile() {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Users/Teachers/${userId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setUser(response.data.user);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    const [deleteLoading, setDeleteLoading] = useState(false);

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else
        return (
            <div className=" pt-6 pl-6">
                <div className="text-xl font-semibold  text-green_b pb-6">
                    Teacher Profile
                </div>
                <Hero user={user} />
                {/* <Applications /> */}
                <PersonalInformations user={user} />
                <div className=" my-6 w-fit mx-auto">
                    {deleteLoading ? (
                        <div className=" small-loader mt-2 mr-10"></div>
                    ) : (
                        <div
                            className=" cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg font-semibold"
                            onClick={() => {
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes, delete it!",
                                    cancelButtonText: "No, cancel!",
                                    cancelButtonColor: "#3085d6",
                                    confirmButtonColor: "#d33",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        setDeleteLoading(true);
                                        axios
                                            .delete(
                                                `http://localhost:3000/Admin/Users/Teachers/${userId}`,
                                                {
                                                    withCredentials: true,
                                                    validateStatus: () => true,
                                                }
                                            )
                                            .then((response) => {
                                                if (response.status === 200) {
                                                    Swal.fire(
                                                        "Deleted!",
                                                        "The student has been deleted.",
                                                        "success"
                                                    );
                                                    navigate(
                                                        "/Users"
                                                    );
                                                } else if (
                                                    response.status === 401
                                                ) {
                                                    Swal.fire(
                                                        "Unauthorized",
                                                        "Please You have to Login Again",
                                                        "error"
                                                    );
                                                    navigate("/Login");
                                                } else
                                                    Swal.fire(
                                                        "Error",
                                                        "Somthing went wrong",
                                                        "error"
                                                    );
                                            })
                                            .catch((err) => {
                                                Swal.fire(
                                                    "Error",
                                                    "Somthing went wrong",
                                                    "error"
                                                );
                                            })
                                            .finally(() => {
                                                setDeleteLoading(false);
                                            });
                                    }
                                });
                            }}
                        >
                            Delete Profile
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Teacher_Profile;
