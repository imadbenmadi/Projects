import React from "react";
import Alert_Complete_Profile from "../Alerts/Alert_Complete_Profile";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import Project_Accpted from "../../../../public/Project/Project_Accpted.png";
import Project_Waiting from "../../../../public/Project/Project_Waiting.png";
import Project_Done from "../../../../public/Project/Project_Done.png";
import Project_Waiting2 from "../../../../public/Project/Project_Waiting2.png";
import Project_Rejected from "../../../../public/Project/Project_Rejected.png";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import Alert_icon from "../../../../public//Project/Alert.png";
import { FaUpload } from "react-icons/fa";
import Axios from "axios";
import { IoIosStar } from "react-icons/io";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Freelancer_Process_item() {
    const Navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);
    const [openUpload, setOpenUpload] = useState(false);
    const [Rejections, SetRejections] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [openRate, setOpenRate] = useState(false);
    const [Rate, setRate] = useState(0);
    const [Comment, setComment] = useState("");

    useEffect(() => {
        if (openUpload) {
            // window.scrollTo({ top: 0, behavior: "smooth" });
            window.scrollTo(0, 0);
        }
    }, [openUpload]);
    const location = useLocation();
    const projectId = location.pathname.split("/")[3];
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [project, setProject] = useState([]);
    const { show_Alert_completeProfile } = useAppContext();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [Feedback_Loading, setFeedback_Loading] = useState(false);

    const isDraftJSFormat = (str) => {
        try {
            const parsed = JSON.parse(str);
            return parsed.blocks && parsed.entityMap;
        } catch (e) {
            return false;
        }
    };
    const handle_send_Feedback = async () => {
        setFeedback_Loading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Freelancers/${user?.id}/Rate/${project.ClientId}`,
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
                Navigate("/Freelancer/Process");
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
    const uploadFile = async () => {
        setOpenUpload(true);
        setUploadLoading(true);
        try {
            let formData = new FormData();
            formData.append("files", file);
            formData.append("projectId", projectId);
            let Image_Response = await Axios.post(
                `http://localhost:3000/upload/Work`,
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (Image_Response.status == 200) {
                Swal.fire("Success", "File uploaded successfully", "success");
                setOpenUpload(false);
            } else if (Image_Response.status == 401) {
                // Swal.fire("Error", `${Image_Response.data.message} `, "error");
                window.location.href = "/Login";
            } else if (Image_Response.status == 400) {
                Swal.fire("Error", `${Image_Response.data.message} `, "error");
            } else if (Image_Response.status == 409) {
                Swal.fire("Error!", `${Image_Response.data.message} `, "error");
            } else if (Image_Response.status == 500) {
                Swal.fire("Error!", `Internal Server Error   `, "error");
            } else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${Image_Response.data} `,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setUploadLoading(false);
            setOpenUpload(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        const FetchProject = async ({ setProject, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Freelancers/${user?.id}/Process/${projectId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const Project = response.data.Project;
                    setProject(Project);
                    let contentState;
                    if (Project.Description) {
                        // Ensure project.Description is defined
                        if (isDraftJSFormat(Project.Description)) {
                            contentState = convertFromRaw(
                                JSON.parse(Project.Description)
                            );
                        } else {
                            contentState = ContentState.createFromText(
                                Project.Description
                            );
                        }
                        setEditorState(
                            EditorState.createWithContent(contentState)
                        );
                    } else {
                        setEditorState(EditorState.createEmpty());
                    }
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Naviagte("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                // setLoading(false);
            }
        };
        const fetchRejections = async ({ SetRejections }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Freelancers/${user?.id}/${projectId}/Rejections`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const rejections = response.data.Rejection_Resons;
                    SetRejections(rejections);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Naviagte("/Login");
                } else {
                    // setError(response.data);
                }
            } catch (error) {
                // setError(error);
            } finally {
                // setLoading(false);
            }
        };

        FetchProject({ setProject, setLoading, setError }).then(() => {
            fetchRejections({ SetRejections }).then(() => {
                setLoading(false);
            });
        });
    }, []);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }
    // else if (error)
    //     return (
    //         <div className=" w-screen h-screen flex items-center justify-center">
    //             <div className="text-red-600 font-semibold">
    //                 {error.message}
    //             </div>
    //         </div>
    //     );
    else
        return (
            <div className=" w-full h-full relative  min-h-[calc(100vh-60px)]">
                {openUpload && (
                    <div className="bg-gray_v bg-opacity-10 z-10 absolute top-0 left-0 w-full h-full flex flex-col pt-10 items-center">
                        <div className="w-fit mx-auto">
                            <img
                                src={Alert_icon}
                                className="w-20  object-cover"
                                alt=""
                            />
                        </div>
                        <div className="w-[90%] mx-auto md:mx-0  md:w-[600px] h-fit bg-white text-gray_v rounded-lg py-5 px-10 flex flex-col justify-between">
                            <div>
                                <div className="mb-2 font-semibold">
                                    Please upload a single file that contains
                                    all the project files.
                                </div>
                                <div className="text-gray_v text-xs">
                                    <div className="mb-2">
                                        To do this, you can compress all your
                                        project documents into a single ZIP
                                        file:
                                    </div>
                                    <ul className="list-disc pl-5">
                                        <li className="mb-1">
                                            Gather all the necessary project
                                            files into one folder on your
                                            computer.
                                        </li>
                                        <li className="mb-1">
                                            Right-click on the folder and select
                                            "Compress" or "Send to Compressed
                                            (zipped) folder" (Windows) or
                                            "Compress [folder name]" (Mac).
                                        </li>
                                        <li className="mb-1">
                                            Ensure the ZIP file contains all
                                            required documents and is named
                                            appropriately.
                                        </li>
                                        <li className="mb-1">
                                            Upload the resulting ZIP file using
                                            the upload button below.
                                        </li>
                                    </ul>
                                    <div className="mt-2 font-semibold">
                                        This helps ensure that all your files
                                        are submitted together and can be easily
                                        accessed.
                                    </div>
                                </div>
                            </div>
                            <div
                                className=" mt-3 w-fit mx-auto rounded-lg py-4 px-8 cursor-pointer
                                      border-2 border-perpol_v flex flex-col items-center justify-center"
                                onClick={() => {
                                    document
                                        .getElementById("input_file")
                                        .click();
                                }}
                            >
                                <FaUpload className=" text-perpol_v text-2xl " />
                                <div className=" text-sm pt-2 font-semibold text-gray_v max-w-[300px] text-center">
                                    {fileName || "No file chosen"}{" "}
                                </div>
                            </div>

                            <input
                                type="file"
                                className=" hidden "
                                id="input_file"
                                onChange={(event) => {
                                    if (event.target.files.length > 0) {
                                        setFileName(event.target.files[0].name);
                                        setFile(event.target.files[0]);
                                    }
                                }}
                            />
                            <div
                                className=" flex justify-center items-center
                             gap-6  my-4"
                            >
                                {uploadLoading ? (
                                    <span className="small-loader mr-8  w-fit"></span>
                                ) : (
                                    <div
                                        onClick={() => {
                                            if (!file)
                                                Swal.fire(
                                                    "Error",
                                                    "Please choose a file to upload",
                                                    "error"
                                                );
                                            else {
                                                uploadFile();
                                            }
                                        }}
                                        className=" cursor-pointer text-white bg-green_v font-semibold py-3 px-5 rounded-lg "
                                    >
                                        Upload
                                    </div>
                                )}
                                <div
                                    onClick={() => {
                                        setOpenUpload(false);
                                    }}
                                    className=" cursor-pointer text-white bg-red-500 font-semibold py-3 px-5 rounded-lg "
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
                                moment to share your thoughts about your
                                experience working with us. We appreciate your
                                input and use it to continually improve our
                                services. Thank you for your time!
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
                {show_Alert_completeProfile && <Alert_Complete_Profile />}
                <div className="w-[90%] mx-auto max-w-[900px] pt-6">
                    <div className="font-semibold text-gray_v text-2xl">
                        {project?.Title}
                    </div>
                    <div className="mx-auto w-fit max-w-[300px] md:max-w-[500px]">
                        <div className=" flex justify-center">
                            {project?.status === "Accepted" ? (
                                <img
                                    src={Project_Accpted}
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
                        <div className=" max-w-[300px] md:max-w-[500px] font-semibold text-gray_v py-2">
                            {project?.status === "Payed" &&
                            !project?.isWorkUploaded ? (
                                //  &&!project?.isWorkRejected
                                <>
                                    <div className="">
                                        <span className="text-green_v">
                                            Client is waiting for your work :
                                        </span>{" "}
                                        please upload the files as soon as you
                                        finished working on the project
                                    </div>
                                    <div className="w-full flex  flex-col md:flex-row gap-2  items-center justify-center">
                                        <div
                                            onClick={() => {
                                                setOpenUpload(true);
                                            }}
                                            className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                            cursor-pointer bg-perpol_v flex items-center gap-2 "
                                        >
                                            <MdOutlineFileUpload className=" text-xl  shrink-0" />{" "}
                                            Upload Files
                                        </div>
                                        {project?.isWorkUploaded && (
                                            <a
                                                download={true}
                                                href={`http://localhost:3000${project?.work_Link}`}
                                                className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                                cursor-pointer bg-green_v  flex items-center gap-2 "
                                            >
                                                <MdOutlineFileDownload className=" text-xl  shrink-0" />
                                                Download Work
                                            </a>
                                        )}
                                        <div></div>
                                    </div>
                                </>
                            ) : project?.status === "Payed" &&
                              project?.isWorkRejected &&
                              project?.isWorkUploaded ? (
                                <div>
                                    <div className="">
                                        <span className="text-red-500">
                                            Client Rejected Your work :
                                        </span>{" "}
                                        please check the rejections history to
                                        view the reason
                                    </div>
                                    <div className="w-full flex  flex-col md:flex-row gap-2  items-center justify-center">
                                        <div
                                            onClick={() => {
                                                setOpenUpload(true);
                                            }}
                                            className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                            cursor-pointer bg-perpol_v flex items-center gap-2 "
                                        >
                                            <MdOutlineFileUpload className=" text-xl  shrink-0" />{" "}
                                            reUpload Files
                                        </div>
                                        {project?.isWorkUploaded && (
                                            <a
                                                download={true}
                                                href={`http://localhost:3000${project?.work_Link}`}
                                                className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                                cursor-pointer bg-green_v  flex items-center gap-2 "
                                            >
                                                <MdOutlineFileDownload className=" text-xl  shrink-0" />
                                                Download previous Work
                                            </a>
                                        )}
                                        <div></div>
                                    </div>
                                </div>
                            ) : project?.status === "Payed" &&
                              !project?.isWorkRejected &&
                              project?.isWorkUploaded ? (
                                <div>
                                    <div className="">
                                        <span className="text-gray_v">
                                            Waiting the Client to review your
                                            work
                                        </span>{" "}
                                    </div>
                                    <div className="w-full flex  flex-col md:flex-row gap-2  items-center justify-center">
                                        {/* <div
                                            onClick={() => {
                                                setOpenUpload(true);
                                            }}
                                            className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                            cursor-pointer bg-perpol_v flex items-center gap-2 "
                                        >
                                            <MdOutlineFileUpload className=" text-xl  shrink-0" />{" "}
                                            Upload Files
                                        </div> */}
                                        {project?.isWorkUploaded && (
                                            <a
                                                download={true}
                                                href={`http://localhost:3000${project?.work_Link}`}
                                                className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                                cursor-pointer bg-green_v  flex items-center gap-2 "
                                            >
                                                <MdOutlineFileDownload className=" text-xl  shrink-0" />
                                                Download Work
                                            </a>
                                        )}
                                        <div></div>
                                    </div>
                                </div>
                            ) : project?.status === "Completed" ? (
                                <>
                                    <div className="">
                                        <span className="text-green_v">
                                            Completed :
                                        </span>{" "}
                                        the project has been closed.
                                    </div>
                                    <div className="w-full flex items-center justify-center flex-col gap-6">
                                        <a
                                            download={true}
                                            href={`http://localhost:3000${project?.work_Link}`}
                                            className=" mt-4 py-1 px-2 rounded-md text-white mx-auto
                                                cursor-pointer bg-perpol_v  flex items-center gap-2 "
                                        >
                                            <MdOutlineFileDownload className=" text-xl  shrink-0" />
                                            Download Work
                                        </a>
                                        {!project?.isFreelancer_send_Feedback && (
                                            <div
                                                className=" bg-green_v   py-1 px-2 w-fit rounded-md text-white mx-auto
                                                cursor-pointer  flex items-center gap-2 "
                                                onClick={() => {
                                                    setOpenRate(true);
                                                }}
                                            >
                                                Rate The Client
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : project?.status === "Accepted" ? (
                                <>
                                    <div className="">
                                        <span className="text-green_v">
                                            Accepted :
                                        </span>{" "}
                                        <span className=" text-gray_v">
                                            waiting for the client to pay the
                                            project fees
                                        </span>
                                    </div>
                                </>
                            ) : null}
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
                                                {dayjs(
                                                    rejection?.createdAt
                                                ).format("DD MMMM YYYY")}
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
                                <div className=" text-gray_v">
                                    {project?.Title}
                                </div>
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

                            <div className="flex items-center justify-between w-full py-2 font-semibold">
                                <div className="text-sm pt-1 text-gray_v">
                                    Deadline : {project?.DeadLine}
                                </div>
                            </div>
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
                                <Editor
                                    editorState={editorState}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Freelancer_Process_item;
