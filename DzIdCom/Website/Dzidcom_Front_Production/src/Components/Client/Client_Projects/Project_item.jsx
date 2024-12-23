import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../../AppContext.jsx";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import { IoIosStar } from "react-icons/io";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { MdOutlineFileDownload } from "react-icons/md";
import Project_Accpted from "../../../../public/Project/Project_Accpted.png";
import Project_Waiting from "../../../../public/Project/Project_Waiting.png";
import Project_Done from "../../../../public/Project/Project_Done.png";
import Project_Waiting2 from "../../../../public/Project/Project_Waiting2.png";
import Project_Rejected from "../../../../public/Project/Project_Rejected.png";
import Alert_icon from "../../../../public//Project/Alert.png";
function ProjectItem() {
    const [Accept_Loading, setAccept_Loading] = useState(false);
    const [Reject_Loading, setReject_Loading] = useState(false);
    const [Reason, SetReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [openRate, setOpenRate] = useState(false);
    const [Rate, setRate] = useState(0);
    const [Comment, setComment] = useState("");
    const [Feedback_Loading, setFeedback_Loading] = useState(false);

    const [OpenRejection, setOpenRejection] = useState(false);
    const location = useLocation();
    const { user } = useAppContext();
    const [Rejections, setRejections] = useState([]);
    if (!location.pathname.split("/")[3]) {
        return <Navigate to="/Client/Projects" />;
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const Navigate = useNavigate();
    const [Delete_Loading, SetDelete_Loading] = useState(false);
    const Delete_Project = async () => {
        SetDelete_Loading(true);
        try {
            const response = await axios.delete(
                `https://api.dzidcom.com/Clients/${user?.id}/Projects/${
                    location.pathname.split("/")[3]
                }`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                Swal.fire("Success", "Project Deleted Successfully", "success");
                Navigate("/Client/Projects");
            } else if (response.status === 401) {
                Swal.fire(
                    "Unauthorized",
                    "Please You have to Login Again",
                    "error"
                );
                // Navigate("/Login");
            } else Swal.fire("Error", "Somthing went wrong", "error");
        } catch (err) {
            Swal.fire("Error", "Somthing went wrong", "error");
        } finally {
            SetDelete_Loading(false);
        }
    };

    const handle_Accept = async () => {
        setAccept_Loading(true);
        try {
            let response = await axios.post(
                `https://api.dzidcom.com/Clients/${user?.id}/Projects/${
                    location.pathname.split("/")[3]
                }/Accept_work`,
                {},
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Work Accepteed Successfully", "success");
                Navigate("/Client/Projects");
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
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        } finally {
            setAccept_Loading(false);
        }
    };
    const handle_Reject = async () => {
        if (!Reason) {
            Swal.fire("Error", "please fill your Rejection Reason", "error");
            return;
        }
        setReject_Loading(true);
        try {
            let response = await axios.post(
                `https://api.dzidcom.com/Clients/${user?.id}/Projects/${
                    location.pathname.split("/")[3]
                }/Reject_work`,
                { Reason },
                // Reason,
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Work Rejected Successfully", "success");
                Navigate("/Client/Projects");
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
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        } finally {
            setReject_Loading(false);
        }
    };
    const handle_send_Feedback = async () => {
        setFeedback_Loading(true);
        try {
            let response = await axios.post(
                `https://api.dzidcom.com/Clients/${user?.id}/Rate/${project.FreelancerId}`,
                {
                    Rate,
                    Comment,
                    ProjectId: project.id,
                },
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Success", "Feedback Sended Successfully", "success");
                Navigate("/Client/Projects");
            } else if (response.status == 401) window.location.href = "Login";
            else {
                Swal.fire("Error!", `${response.data.message} `, "error");
            }
        } catch (error) {
            Swal.fire("Error!", `${error}`, "error");
        } finally {
            setFeedback_Loading(false);
        }
    };

    useEffect(() => {
        setLoading(true);

        const fetchProject = async () => {
            try {
                const response = await axios.get(
                    `https://api.dzidcom.com/Clients/${user?.id}/Projects/${
                        location.pathname.split("/")[3]
                    }`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const project = response.data.Project;
                    setProject(project);

                    let contentState;
                    if (isDraftJSFormat(project.Description)) {
                        contentState = convertFromRaw(
                            JSON.parse(project.Description)
                        );
                    } else {
                        contentState = ContentState.createFromText(
                            project.Description
                        );
                    }

                    setEditorState(EditorState.createWithContent(contentState));
                } else if (response.status === 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                // setLoading(false);
            }
        };
        const fetchRejections = async () => {
            try {
                const response = await axios.get(
                    `https://api.dzidcom.com/Clients/${user?.id}/${
                        location.pathname.split("/")[3]
                    }/Rejections`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const Rejection_Resons = response.data.Rejection_Resons;
                    setRejections(Rejection_Resons);
                } else if (response.status === 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                // setLoading(false);
            }
        };
        Promise.all([fetchProject(), fetchRejections()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        fetchProject();
    }, []);

    const isDraftJSFormat = (str) => {
        try {
            const parsed = JSON.parse(str);
            return parsed.blocks && parsed.entityMap;
        } catch (e) {
            return false;
        }
    };

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    return (
        <div className=" relative min-h-[calc(100vh-60px)]">
            {OpenRejection && (
                <div
                    className="bg-gray_v bg-opacity-50 z-10 absolute top-0 left-0 w-full h-full
                 flex flex-col pt-10 items-center"
                >
                    <div className="w-fit mx-auto">
                        <img
                            src={Alert_icon}
                            className="w-20  object-cover"
                            alt=""
                        />
                    </div>
                    <div
                        className="w-[95%] mx-auto md:mx-0 md:w-[600px] h-fit bg-white
                         text-gray_v 
                    rounded-lg py-5 px-4 md:px-10 flex flex-col justify-between "
                    >
                        <div className=" text-sm font-semibold pb-2">
                            You Can send a rejection to the freelancer if you
                            did not liked the work.
                        </div>
                        <textarea
                            name=""
                            rows={6}
                            className=" border resize-none p-3 rounded-lg"
                            placeholder="Please write the reason of rejection"
                            onChange={(e) => {
                                SetReason(e.target.value);
                            }}
                            id=""
                        ></textarea>

                        <div
                            className=" flex justify-center items-center
                             gap-6  my-4"
                        >
                            {Reject_Loading ? (
                                <span className="small-loader mr-8  w-fit"></span>
                            ) : (
                                <div
                                    onClick={() => {
                                        if (Reason.length == 0)
                                            Swal.fire(
                                                "Error",
                                                "Please Fill the Rejection Reason",
                                                "error"
                                            );
                                        else {
                                            handle_Reject();
                                        }
                                    }}
                                    className=" cursor-pointer text-white bg-red-500 font-semibold py-3 px-5 rounded-lg "
                                >
                                    Send
                                </div>
                            )}
                            <div
                                onClick={() => {
                                    setOpenRejection(false);
                                }}
                                className=" cursor-pointer text-white bg-blue-500 font-semibold py-3 px-5 rounded-lg "
                            >
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {openRate && (
                <div
                    className="bg-gray_v bg-opacity-70 z-10 absolute top-0 left-0 w-full h-full
                 flex flex-col pt-3 items-center"
                >
                    <div className="w-fit mx-auto">
                        <img
                            src={Alert_icon}
                            className="w-20  object-cover"
                            alt=""
                        />
                    </div>
                    <div
                        className="w-[95%] mx-auto md:mx-0 md:w-[600px] h-fit bg-white
                         text-gray_v 
                    rounded-lg py-5 px-4 md:px-10 flex flex-col justify-between "
                    >
                        <div className=" text-md font-semibold pb-2">
                            Give us a feedback.
                        </div>
                        <div className=" flex gap-1 items-center justify-center py-2  text-2xl">
                            <IoIosStar
                                className={` cursor-pointer ${
                                    Rate >= 1
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                                onClick={() => {
                                    setRate(1);
                                }}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    Rate >= 2
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                                onClick={() => {
                                    setRate(2);
                                }}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    Rate >= 3
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                                onClick={() => {
                                    setRate(3);
                                }}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    Rate >= 4
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                                onClick={() => {
                                    setRate(4);
                                }}
                            />
                            <IoIosStar
                                className={`  cursor-pointer ${
                                    Rate == 5
                                        ? "text-yallow_v"
                                        : "text-gray_white"
                                }`}
                                onClick={() => {
                                    setRate(5);
                                }}
                            />
                        </div>
                        <div className=" py-3 text-xs text-gray_v">
                            Your feedback is important to us! Please take a
                            moment to share your thoughts about your experience
                            working with us. We appreciate your input and use it
                            to continually improve our services. Thank you for
                            your time!
                        </div>
                        <textarea
                            name=""
                            rows={6}
                            className=" border resize-none p-3 rounded-lg  placeholder:text-sm"
                            placeholder="Add Comment Here"
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            id=""
                        ></textarea>

                        <div
                            className=" flex justify-center items-center
                             gap-6  my-4"
                        >
                            {Feedback_Loading ? (
                                <span className="small-loader mr-8  w-fit"></span>
                            ) : (
                                <div
                                    onClick={() => {
                                        if (Rate == 0)
                                            Swal.fire(
                                                "Error",
                                                "Select a rate please",
                                                "error"
                                            );
                                        else if (Comment == "")
                                            Swal.fire(
                                                "Error",
                                                "Write a comment Please",
                                                "error"
                                            );
                                        else {
                                            handle_send_Feedback();
                                        }
                                    }}
                                    className=" cursor-pointer text-white bg-green_v font-semibold py-3 px-5 rounded-lg "
                                >
                                    Send
                                </div>
                            )}
                            <div
                                onClick={() => {
                                    setOpenRate(false);
                                }}
                                className=" cursor-pointer text-white bg-blue-500 font-semibold py-3 px-5 rounded-lg "
                            >
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="px-4 max-w-[900px] md:mx-auto pt-6 relative">
                <div className="font-semibold text-gray_v text-2xl">
                    {project?.Title}
                </div>
                <div className=" flex flex-col md:flex-row  items-center md:items-start md:justify-center  md:gap-12 gap-6">
                    <div className=" w-fit">
                        <div className="">
                            {project?.status === "Accepted" &&
                            !project?.FreelancerId ? (
                                <img
                                    src={Project_Accpted}
                                    className="w-[250px]  object-cover"
                                    alt=""
                                />
                            ) : project?.status === "Pending" ? (
                                <img
                                    src={Project_Waiting}
                                    className="w-[250px]  object-cover"
                                    alt=""
                                />
                            ) : project?.status === "Rejected" ? (
                                <img
                                    src={Project_Rejected}
                                    className="w-[250px]  object-cover"
                                    alt=""
                                />
                            ) : project?.status === "Completed" ? (
                                <img
                                    src={Project_Done}
                                    className="w-[250px]  object-cover"
                                    alt=""
                                />
                            ) : project?.status === "Payed" ||
                              (project?.status === "Accepted" &&
                                  project?.FreelancerId) ? (
                                <img
                                    src={Project_Waiting2}
                                    className="w-[250px]  object-cover"
                                    alt=""
                                />
                            ) : null}
                        </div>
                        <div className=" max-w-[300px] font-semibold text-gray_v py-2">
                            {project?.status === "Payed" &&
                            !project?.isWorkUploaded ? (
                                <>
                                    <div className="">
                                        <span className="text-green_v">
                                            Payed :
                                        </span>{" "}
                                        Your payment accepted. <br />a
                                        Freelancer is working on your project
                                    </div>
                                    {/* <div className="w-full flex items-center justify-center">
                                    <Link
                                        to={`/Client/Projects/${project?.id}/Process`}
                                        className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                    cursor-pointer bg-perpol_v"
                                    >
                                        Track Project
                                    </Link>
                                </div> */}
                                </>
                            ) : project?.status === "Payed" &&
                              project?.isWorkUploaded &&
                              !project?.isWorkRejected ? (
                                <>
                                    <div className="">
                                        <span className="text-green_v">
                                            Uploaded :
                                        </span>{" "}
                                        The Freelancer Upload the files of your
                                        project .
                                        <br />
                                        please validate the work
                                    </div>
                                    {/* <div className="w-full flex items-center justify-center">
                                    <Link
                                        to={`/Client/Projects/${project?.id}/Process`}
                                        className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                    cursor-pointer bg-perpol_v"
                                    >
                                        Track Project
                                    </Link>
                                </div> */}
                                </>
                            ) : project?.status === "Payed" &&
                              project?.isWorkUploaded &&
                              project?.isWorkRejected ? (
                                <>
                                    <div className="">
                                        <span className="text-red-500">
                                            Rejection Sent to the Freelancer :
                                        </span>{" "}
                                        please wait till the freelancer correct
                                        the mentioned pointes .
                                    </div>
                                    {/* <div className="w-full flex items-center justify-center">
                                    <Link
                                        to={`/Client/Projects/${project?.id}/Process`}
                                        className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                    cursor-pointer bg-perpol_v"
                                    >
                                        Track Project
                                    </Link>
                                </div> */}
                                </>
                            ) : project?.status === "Rejected" ? (
                                <>
                                    <div className="">
                                        <span className="text-red-600">
                                            Rejected :
                                        </span>{" "}
                                        Your project has been rejected
                                    </div>
                                    <div className=" w-full flex justify-center">
                                        {Delete_Loading ? (
                                            <div className=" small-loader mt-3"></div>
                                        ) : (
                                            <div
                                                className=" bg-red-500 py-1 px-2 text-white rounded-lg cursor-pointer w-fit mt-4"
                                                onClick={Delete_Project}
                                            >
                                                Delete Project
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : project?.status === "Completed" ? (
                                <>
                                    <div className="">
                                        <span className="text-green_v">
                                            Completed :
                                        </span>{" "}
                                        Your project has been closed.
                                    </div>
                                    <div className=" pt-4 flex flex-col justify-center items-center gap-6">
                                        <a
                                            download={true}
                                            href={`https://api.dzidcom.com${project?.work_Link}`}
                                            className=" mt-4 py-1 px-2 w-fit rounded-md text-white mx-auto
                                                cursor-pointer bg-perpol_v  flex items-center gap-2 "
                                        >
                                            <MdOutlineFileDownload className=" text-xl  shrink-0" />
                                            Download Work
                                        </a>
                                        {!project?.isCleint_send_Feedback && (
                                            <div
                                                className=" bg-green_v   py-1 px-2 w-fit rounded-md text-white mx-auto
                                                cursor-pointer  flex items-center gap-2 "
                                                onClick={() => {
                                                    setOpenRate(true);
                                                }}
                                            >
                                                Rate The Freelancer
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : !project?.isPayment_ScreenShot_uploaded &&
                              project?.status === "Accepted" &&
                              project?.FreelancerId ? (
                                <>
                                    <div className="">
                                        <span className="text-gray_v">
                                            Accepted :
                                        </span>{" "}
                                        <span className=" text-red-500">
                                            You have to pay the fees to start
                                            the project
                                        </span>
                                    </div>
                                    <div className=" w-full flex justify-center">
                                        <Link
                                            to={`/Client/Projects/${project?.id}/Payment`}
                                            className=" bg-perpol_v font-semibold py-1 px-2 text-white rounded-lg cursor-pointer w-fit mt-4"
                                        >
                                            Pay the Project Fees
                                        </Link>
                                    </div>
                                </>
                            ) : project?.isPayment_ScreenShot_uploaded &&
                              project?.status === "Accepted" &&
                              project?.FreelancerId &&
                              !project?.isPayment_ScreenShot_Rejected ? (
                                <div className="">
                                    <span className="text-perpol_v">
                                        Accepted :
                                    </span>{" "}
                                    <span className=" text-gray_v">
                                        Waiting Dashboard to accept the payment
                                    </span>
                                </div>
                            ) : project?.isPayment_ScreenShot_uploaded &&
                              project?.status === "Accepted" &&
                              project?.FreelancerId &&
                              project?.isPayment_ScreenShot_Rejected ? (
                                <>
                                    <div className="">
                                        <span className="text-red-500">
                                            Payment Rejected :
                                        </span>{" "}
                                        <span className=" text-gray_v">
                                            Ower Team rejecteed Your payment.
                                            please reupload the Payment
                                            screenshot , or contact ower support
                                        </span>
                                    </div>
                                    <div className=" w-full flex justify-center">
                                        <Link
                                            to={`/Client/Projects/${project?.id}/Payment`}
                                            className=" bg-perpol_v font-semibold py-1 px-2 text-white rounded-lg cursor-pointer w-fit mt-4"
                                        >
                                            Pay the Project Fees
                                        </Link>
                                    </div>
                                </>
                            ) : project?.status === "Accepted" &&
                              !project?.FreelancerId ? (
                                <div>
                                    <span className="text-perpol_v">
                                        Accepted :
                                    </span>{" "}
                                    Searching For the Freelancer
                                </div>
                            ) : project?.status === "Pending" ? (
                                <>
                                    <div>
                                        <span className="text-perpol_v">
                                            Pending :
                                        </span>{" "}
                                        <span className=" text-gray_v">
                                            Ower team is reviewing your project
                                        </span>
                                    </div>
                                    <div className=" w-full flex justify-center">
                                        {Delete_Loading ? (
                                            <div className=" small-loader mt-3"></div>
                                        ) : (
                                            <div
                                                className=" bg-red-500 py-1 px-2 text-white rounded-lg cursor-pointer w-fit mt-4"
                                                onClick={Delete_Project}
                                            >
                                                Delete Project
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        {project?.status === "Payed" &&
                            project?.isWorkUploaded &&
                            !project?.isWorkRejected && (
                                <div className=" pt-6">
                                    <div className="text-lg font-semibold text-gray_v text-center">
                                        Work Uploaded
                                    </div>
                                    <a
                                        download={true}
                                        href={`https://api.dzidcom.com${project?.work_Link}`}
                                        className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                                cursor-pointer bg-perpol_v  flex items-center gap-2 "
                                    >
                                        <MdOutlineFileDownload className=" text-xl  shrink-0" />
                                        Download Work
                                    </a>
                                    <div className=" flex gap-4 items-center justify-center pt-8">
                                        {Accept_Loading ? (
                                            <span className="small-loader  w-full m-auto"></span>
                                        ) : (
                                            <div
                                                className=" text-white font-semibold py-2 px-4 rounded-lg
                                     bg-green_v cursor-pointer "
                                                onClick={handle_Accept}
                                            >
                                                Accept
                                            </div>
                                        )}
                                        {Reject_Loading ? (
                                            <span className="small-loader  w-full m-auto"></span>
                                        ) : (
                                            <div
                                                className=" text-white font-semibold py-2 px-4 rounded-lg
                                     bg-red-500 cursor-pointer "
                                                onClick={() => {
                                                    setOpenRejection(true);
                                                }}
                                            >
                                                Reject
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>

                {Rejections?.length > 0 ? (
                    <div className=" py-6">
                        <div className=" text-xl text-red-500  font-semibold">
                            Rejections History
                        </div>
                        <div>
                            {Rejections.map((rejection, index) => (
                                <div
                                    key={index}
                                    className=" border p-4 rounded-lg my-6"
                                >
                                    <div className=" flex justify-between items-center pb-6">
                                        <div className="text-lg font-semibold text-gray_v">
                                            Rejection Reason
                                            <div className=" text-sm font-normal">
                                                {rejection.Reason}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-between items-center">
                                        <div className="text-sm font-semibold text-gray_v">
                                            Rejected at :{" "}
                                            {/* {new Date(
                                                rejection.createdAt
                                            ).toLocaleDateString()} */}
                                            {dayjs(rejection?.createdAt).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                <div className=" my-6 ">
                    <div className=" pb-2 font-semibold text-gray_v">
                        Project Details
                    </div>
                    <div className=" border p-4 rounded-lg">
                        <div className=" flex gap-2 text-sm font-semibold">
                            <div>Project Title : </div>
                            <div className=" text-gray_v">{project?.Title}</div>
                        </div>
                        <div className="text-sm  mb-2 font-semibold text-white">
                            <div className=" flex gap-2">
                                {project?.Field_is_Graphic_design && (
                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                        Graphic Design
                                    </div>
                                )}
                                {project?.Field_is_Content_creation && (
                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                        Content creation
                                    </div>
                                )}
                                {project?.Field_is_SEO_SIM && (
                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                        SEO/SMM
                                    </div>
                                )}
                            </div>
                        </div>
                        {project?.Frelancer_Experiance && (
                            <div className="flex items-center justify-between w-full">
                                <div className="text-sm pt-2 text-gray_v">
                                    frelancer experiance :{" "}
                                    <span className=" font-semibold">
                                        {project?.Frelancer_Experiance}
                                    </span>
                                </div>
                            </div>
                        )}
                        {project?.Client_Budget && (
                            <div className="flex items-center justify-between w-full text-sm font-semibold">
                                <div className="text-sm pt-4 text-gray_v flex items-center gap-2">
                                    Budget: {project?.Client_Budget}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between w-full font-semibold">
                            <div className="text-sm pt-1 text-gray_v">
                                Created at :{" "}
                                {/* {new Date(
                                    project?.createdAt
                                ).toLocaleDateString()} */}
                                {dayjs(project?.createdAt).format(
                                    "DD MMMM YYYY"
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold pt-4">
                            Project Description
                        </div>
                        <div className="text-sm font-semibold pl-6 py-6 text-gray_v">
                            <Editor editorState={editorState} readOnly={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectItem;
