import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import user_default from "../../../../public/user_default2.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation } from "react-router";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
dayjs.extend(customParseFormat);
function Reviews({ user }) {
    const [Loading, setLoading] = useState(false);
    const [Feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Users/Freelancers/${user.id}/Feedbacks`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );

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
    const Navigate = useNavigate();
    return (
        <div className="  py-16 px-6 md:px-0 max-w-[750px] mx-auto  flex flex-col gap-6 md:gap-16 break-all ">
            <div className=" text-3xl text-gray_v font-semibold flex items-start justify-between ">
                <div>
                    {user?.JobTitle ? user.JobTitle : "no job title"}

                    <div className=" text-base font-normal pt-6">
                        {user?.about ? user.about : null}
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
                            user.email
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className=" text-lg text-gray_v font-semibold flex items-center justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        About :
                    </div>
                    <div>
                        {user?.about ? (
                            user.about
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
                
            </div>*/}
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
            <div className=" flex items-start justify-between ">
                <div className="flex flex-col gap-6  ">
                    <div className=" shrink-0 text-xl underline font-semibold text-gray_v">
                        Skills :
                    </div>
                    <div className="flex flex-wrap  gap-6">
                        {user?.Skills ? (
                            user.Skills.map((skill) => (
                                <div key={skill.id}>
                                    <div
                                        className=" bg-perpol_v text-xl w-fit py-1
                                                     px-2 text-white rounded-lg "
                                    >
                                        {skill.skill}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className=" text-sm font-semibold  text-gray_v">
                                No skills found
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className=" w-full bg-gray_white h-[1px]"> </div>

            <div className=" text-lg text-gray_v font-semibold flex  justify-between ">
                <div className=" flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-6">
                    <div className=" text-xl underline font-semibold">
                        Portfolio Website :
                    </div>
                    <div>
                        {user?.portfolioWebsite ? (
                            <a
                                className=" text-purple-400 underline"
                                href={user.portfolioWebsite}
                            >
                                {user.portfolioWebsite}
                            </a>
                        ) : (
                            <div className="text-sm">none</div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" flex items-start justify-between ">
                <div className="flex flex-col gap-4 w-full  ">
                    <div className=" shrink-0 text-xl underline font-semibold text-gray_v">
                        Portfolio :
                    </div>
                    <div className="flex flex-wrap gap-6">
                        {user?.PortfolioItems &&
                        user.PortfolioItems.length > 0 ? (
                            user.PortfolioItems.map((project) => (
                                <div
                                    key={project.id}
                                    className="w-full mx-auto md:mx-0 md:min-w-full break-words overflow-hidden flex flex-col gap-5 font-semibold border border-gray_white rounded-lg p-4"
                                >
                                    <div className="font-semibold text-lg text-gray_v">
                                        {project.title}
                                    </div>
                                    <div className="text-sm text-gray_v">
                                        {project.description}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray_v">
                                        <div>
                                            {/* {new Date(
                                                project.startDate
                                            ).toLocaleDateString()} */}
                                            {dayjs(project?.startDate).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <div> -</div>
                                            {project.endDate && (
                                                <div>
                                                    {/* {new Date(
                                                        project.endDate
                                                    ).toLocaleDateString()} */}
                                                    {dayjs(
                                                        project?.endDate
                                                    ).format("DD MMMM YYYY")}
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-semibold">
                                            {project.stillWorking
                                                ? "Still Working"
                                                : ""}
                                        </div>
                                    </div>
                                    {project.livePreviewLink && (
                                        <div className="flex gap-2">
                                            <div className="font-semibold text-gray_v">
                                                Preview link:
                                            </div>
                                            <a
                                                href={project.livePreviewLink}
                                                className="underline text-perpol_v"
                                            >
                                                {project.livePreviewLink}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className=" font-semibold text-gray_v text-center text-sm ">
                                No items found
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {user?.facebook_Link ||
            user?.instgram_Link ||
            user?.linkedIn_Link ? (
                <div className=" flex justify-between">
                    <div className=" flex gap-6">
                        {user?.facebook_Link && (
                            <FaFacebook
                                className=" text-blue-500 text-5xl cursor-pointer  "
                                onClick={() => {
                                    window.location.href = user.facebook_Link;
                                }}
                            />
                        )}
                        {user?.instgram_Link && (
                            <FaInstagram
                                className=" text-red-500 text-5xl cursor-pointer  "
                                onClick={() => {
                                    window.location.href = user.instagram_Link;
                                }}
                            />
                        )}
                        {user?.linkedIn_Link && (
                            <FaLinkedin
                                className=" text-blue-500 text-5xl cursor-pointer  "
                                onClick={() => {
                                    window.location.href = user.linkedin_Link;
                                }}
                            />
                        )}
                    </div>
                </div>
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
                    {/* <div className=" text-center text-md font-semibold text-gray_v pt-6">
                        {" "}
                        No Rattings yet
                    </div> */}
                </div>
            </div>
        </div>
    );
}

function Hero({ user }) {
    const Navigate = useNavigate();
    return (
        <div className="flex flex-row  items-start justify-around  pb-10">
            <div className="  flex  justify-center max-w-[350px] gap-6 md:gap-12">
                {user?.profile_pic_link ? (
                    <img
                        src={"http://localhost:3000/" + user.profile_pic_link}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = user_default;
                        }}
                        alt=""
                        className=" w-[150px]  object-cover rounded-full"
                    />
                ) : (
                    <img
                        src={user_default}
                        alt=""
                        className=" w-32  object-cover"
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
                                feedback?.Client?.profile_pic_link
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
                            {feedback?.Client?.firstName}
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

function Profile() {
    const Navigate = useNavigate();
    // const [Rejections, SetRejections] = useState([]);
    const location = useLocation();
    const projectId = location.pathname.split("/")[2];
    const userId = location.pathname.split("/")[3];
    const Naviagte = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [project, setProject] = useState([]);
    const [AcceptLoading, setAcceptLoading] = useState(false);
    const [RejectLoading, setRejectLoading] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [user, setUser] = useState(null);

    // Function to format the date
    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD  MMMM  YYYY");
    };
    const handle_Accept = async () => {
        setAcceptLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Applications/${projectId}/${userId}/Accept`,
                {
                    Money: money,
                    DeadLine: deadLine,
                },
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Application Accepteed Successfully",
                    "success"
                );
                Navigate("/Projects_Applications");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter, ${error.message}`,
                "error"
            );
        } finally {
            setAcceptLoading(false);
        }
    };
    const handle_Reject = async () => {
        setRejectLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Applications/${projectId}/${userId}/Reject`,
                {},
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire(
                    "Success",
                    "Application Rejected Successfully",
                    "success"
                );
                Navigate("/Projects_Applications");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter,  ${error.message}`,
                "error"
            );
        } finally {
            setRejectLoading(false);
        }
    };
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
                    Navigate("/Login");
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
    const [openAccept, setopenAccept] = useState(false);
    const [deadLine, setdeadLine] = useState(null);
    const [money, setmoney] = useState(null);

    if (loading) {
        return (
            <div className=" w-[80vh] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else
        return (
            <div className=" w-full h-full  relative py-6 px-4">
                {openAccept && (
                    <div className="bg-gray_v bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full flex flex-col pt-36 items-center">
                        <div className="w-fit mx-auto">
                            {/* <img src={Alert_icon} className="w-20" alt="" /> */}
                        </div>
                        <div className="w-[90%] mx-auto md:mx-0 md:w-[600px] h-fit bg-white text-gray_v rounded-lg py-5 px-10 flex flex-col justify-between">
                            <div className=" flex flex-col gap-6 items-center justify-center  pb-6">
                                <div className="">
                                    <label
                                        htmlFor="input_deadline"
                                        className=" text-sm  font-semibold"
                                    >
                                        Deadline
                                    </label>
                                    <input
                                        id="input_deadline"
                                        type="text"
                                        value={deadLine}
                                        onChange={(e) => {
                                            setdeadLine(e.target.value);
                                        }}
                                        className=" border-2 rounded-lg w-[80%] py-2 px-4 "
                                        placeholder="15 juin 2024"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="input_deadline"
                                        className=" text-sm  font-semibold"
                                    >
                                        Project Fees
                                    </label>
                                    <input
                                        id="input_fees"
                                        type="text"
                                        value={money}
                                        onChange={(e) => {
                                            setmoney(e.target.value);
                                        }}
                                        className=" border-2 rounded-lg w-[80%] py-2 px-4 "
                                        placeholder="15000 DA"
                                    />
                                </div>
                            </div>
                            <div
                                className=" flex justify-center items-center
                             gap-6  my-4"
                            >
                                {AcceptLoading ? (
                                    <span className="small-loader mr-8  w-fit"></span>
                                ) : (
                                    <div
                                        onClick={() => {
                                            if (!deadLine || !money)
                                                Swal.fire(
                                                    "Error",
                                                    "Please fill the Fields",
                                                    "error"
                                                );
                                            else {
                                                handle_Accept();
                                            }
                                        }}
                                        className=" cursor-pointer text-white bg-green_v font-semibold py-3 px-5 rounded-lg "
                                    >
                                        Send
                                    </div>
                                )}
                                <div
                                    onClick={() => {
                                        setopenAccept(false);
                                    }}
                                    className=" cursor-pointer text-white bg-red-500 font-semibold py-3 px-5 rounded-lg "
                                >
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="text-xl font-semibold  text-perpol_b pb-6">
                    Freelancer Profile
                </div>
                <div className=" flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                    {AcceptLoading ? (
                        <div className=" small-loader mx-12"></div>
                    ) : (
                        <div
                            className=" bg-green_v py-2 px-4 rounded-lg text-white font-semibold cursor-pointer"
                            onClick={() => {
                                setopenAccept(true);
                            }}
                        >
                            Accept Application
                        </div>
                    )}
                    {RejectLoading ? (
                        <div className=" small-loader mx-12"></div>
                    ) : (
                        <div
                            className=" bg-red-500 py-2 px-4 rounded-lg text-white font-semibold cursor-pointer"
                            onClick={handle_Reject}
                        >
                            Reject Application
                        </div>
                    )}
                </div>
                <div className=" pt-12">
                    <Hero user={user} />
                    {/* <Applications /> */}
                    <PersonalInformations user={user} />
                    <Reviews user={user} />
                </div>
            </div>
        );
}

export default Profile;
