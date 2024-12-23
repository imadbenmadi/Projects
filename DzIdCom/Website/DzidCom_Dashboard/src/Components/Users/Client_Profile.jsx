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
function Reviews({ user }) {
    const [Loading, setLoading] = useState(false);
    const [Feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let response;
                if ((user.userType = "client"))
                    response = await axios.get(
                        `http://localhost:3000/Admin/Users/Clients/${user.id}/Feedbacks`,
                        {
                            withCredentials: true,
                            // validateStatus: () => true,
                        }
                    );
                else if ((user.userType = "Freelancer"))
                    response = await axios.get(
                        `http://localhost:3000/Admin/Users/Freelancer/${user.id}/Feedbacks`,
                        {
                            withCredentials: true,
                            // validateStatus: () => true,
                        }
                    );
                else {
                    setFeedbacks([]);
                    return;
                }

                if (response.status == 200) {
                    setFeedbacks(response.data.Feedbacks);
                } else {
                    setFeedbacks([]);
                }
            } catch (error) {
                setFeedbacks([]);
            }
        };

        // Promise.all([fetchData()]);
        // Promise.all([fetchData()])
        fetchData()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (Loading)
        return (
            <div className=" w-screen flex items-center justify-center pb-6">
                <span className="small-loader    m-auto"></span>;
            </div>
        );
    else
        return (
            <div>
                {!Feedbacks || Feedbacks?.length == 0 ? (
                    <div className=" text-center text-sm font-semibold text-gray_v pb-6">
                        No feedbacks
                    </div>
                ) : (
                    <div className=" max-w-[90%] mx-auto pb-12">
                        {Feedbacks?.length > 0 &&
                            Feedbacks.map((feedback) => {
                                return (
                                    <Feedback_Card
                                        key={feedback?.id}
                                        feedback={feedback}
                                        Feedbacks={Feedbacks}
                                        setFeedbacks={setFeedbacks}
                                    />
                                );
                            })}
                    </div>
                )}
            </div>
        );
}

function PersonalInformations({ user }) {
    return (
        <div className="  py-4 px-6 md:px-0 max-w-[750px] mx-auto  flex flex-col gap-6 md:gap-16 break-all ">
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Email :
                    </div>
                    <div>
                        {user?.email ? (
                            user.email
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
                            user.telephone
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>

            <div className=" font-semibold text-gray_v text-lg flex items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold  ">
                        {" "}
                        National Card Number{"    "}
                    </div>
                    {user?.nationalCardNumber ? (
                        user.nationalCardNumber
                    ) : (
                        <div className="text-sm">none</div>
                    )}{" "}
                </div>
            </div>
            <div className=" w-full bg-gray_white h-[1px]"> </div>
            <div className=" text-lg text-gray_v font-semibold flex items-start justify-between ">
                <div>
                    <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                        <div className=" text-xl underline font-semibold">
                            Company :
                        </div>
                        <div>
                            <div>
                                {user?.company_Name ? (
                                    user.company_Name
                                ) : (
                                    <div className="text-sm">none</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=" text-sm font-normal pt-4">
                        {user?.company_about ? user.company_about : null}
                    </div>
                </div>
            </div>
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Work Field :
                    </div>
                    <div>
                        <div>
                            {user?.company_WorkField ? (
                                user.company_WorkField
                            ) : (
                                <div className="text-sm">none</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" text-lg text-gray_v font-semibold flex  justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Website :
                    </div>
                    <div>
                        {user?.company_Website ? (
                            <a
                                className=" text-purple-400 underline"
                                href={user.company_Website}
                            >
                                {user.company_Website}
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
                        Adress :
                    </div>
                    <div>
                        {user?.company_Adress ? (
                            user.company_Adress
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-base  font-semibold">
                        Created At :
                    </div>
                    <div>
                        {user?.company_creationDate ? (
                            // new Date(
                            //     user.company_creationDate
                            // ).toLocaleDateString()
                            // formatDate(user?.company_creationDate)
                            dayjs(user?.company_creationDate).format(
                                "DD  MMMM  YYYY"
                            )
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
                                            user.facebook_Link;
                                    }}
                                />
                            )}
                            {user?.instgram_Link && (
                                <FaInstagram
                                    className=" text-red-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user.instagram_Link;
                                    }}
                                />
                            )}
                            {user?.linkedIn_Link && (
                                <FaLinkedin
                                    className=" text-blue-500 text-5xl cursor-pointer  "
                                    onClick={() => {
                                        window.location.href =
                                            user.linkedin_Link;
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : null}

            <div className=" w-full bg-gray_white h-[1px]"> </div>
            <div>
                <div className="flex flex-col gap-4 w-full  ">
                    <div className=" flex flex-row md:items-center gap-6 md:gap-10 shrink-0 text-2xl  font-semibold text-gray_v">
                        <div className=" underline">Reviews : </div>
                        <div className=" flex items-center justify-center gap-4 ">
                            {user?.Rate ? (
                                <>
                                    <div className=" ">{user.Rate}</div>
                                    {/* <div className=" text-yellow-400 flex gap-1">
                                        {[...Array(Math.floor(user.Rate))].map(
                                            (_, index) => (
                                                <FaStar key={index} />
                                            )
                                        )}
                                        {user.Rate % 1 !== 0 && <FaStarHalf />}
                                    </div> */}
                                    <FaStar className="text-yellow-400 " />
                                </>
                            ) : (
                                <div className=" text-sm">No ratings yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function Hero({ user }) {
    const Navigate = useNavigate();
    return (
        <div className="flex flex-row  items-start justify-around pb-10 ">
            <div className="  flex  justify-center max-w-[350px] gap-6 md:gap-12">
                {user?.profile_pic_link ? (
                    <img
                        src={"http://localhost:3000/" + user.profile_pic_link}
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
                <div className=" flex items-center justify-center flex-col mb-6">
                    <div className=" text-xl font-semibold mb-4 text-gray_v">
                        <span>{user?.firstName}</span>{" "}
                        <span>{user?.lastName}</span>
                    </div>
                    {/* <div className=" text-yellow-400 flex w-full text-xl gap-1">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div> */}
                    <div className=" flex  gap-4 w-full ">
                        {user?.Rate ? (
                            <>
                                <div className=" text-yellow-400 flex gap-1">
                                    {[...Array(Math.floor(user.Rate))].map(
                                        (_, index) => (
                                            <FaStar key={index} />
                                        )
                                    )}
                                    {user.Rate % 1 !== 0 && <FaStarHalf />}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
function Feedback_Card({ feedback, Feedbacks, setFeedbacks }) {
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
                            className=" w-20 h-20 rounded-full object-cover"
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

function Client_Profile() {
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
                    `http://localhost:3000/Admin/Users/Freelancers/${userId}`,
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
                <div className="text-xl font-semibold  text-perpol_b pb-6">
                    Client Profile
                </div>
                <Hero user={user} />
                {/* <Applications /> */}
                <PersonalInformations user={user} />
                <Reviews user={user} />
            </div>
        );
}

export default Client_Profile;
