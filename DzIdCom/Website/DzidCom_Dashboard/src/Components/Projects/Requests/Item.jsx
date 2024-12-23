import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Freelancer_Process_item() {
    const Navigate = useNavigate();
    // const [Rejections, SetRejections] = useState([]);
    const location = useLocation();
    const projectId = location.pathname.split("/")[2];
    const Naviagte = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [project, setProject] = useState([]);
    const [AcceptLoading, setAcceptLoading] = useState(false);
    const [RejectLoading, setRejectLoading] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Function to format the date
    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD  MMMM  YYYY");
    };

    const isDraftJSFormat = (str) => {
        try {
            const parsed = JSON.parse(str);
            return parsed.blocks && parsed.entityMap;
        } catch (e) {
            return false;
        }
    };
    const handle_Accept = async () => {
        setAcceptLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Projects/requests/${
                    location.pathname.split("/")[2]
                }/Accept`,
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
                    "Project Request Accepteed Successfully",
                    "success"
                );
                Navigate("/Projects_Requests");
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
            setAcceptLoading(false);
        }
    };
    const handle_Reject = async () => {
        setRejectLoading(true);
        try {
            let response = await axios.post(
                `http://localhost:3000/Admin/Projects/requests/${
                    location.pathname.split("/")[2]
                }/Reject`,
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
                    "Project Request Rejected Successfully",
                    "success"
                );
                Navigate("/Projects_Requests");
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
            setRejectLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        const FetchProject = async ({ setProject, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Projects/requests/${projectId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const Project = response.data.project;
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

        FetchProject({ setProject, setLoading, setError }).then(() => {
            // fetchRejections({ SetRejections }).then(() => {
            setLoading(false);
            // });
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
            <div className=" w-full h-full relative py-6 px-4">
                <div className="text-xl font-semibold  text-perpol_b pb-6">
                    Projects Request
                </div>
                <div className=" flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                    <div
                        className=" bg-perpol_v py-2 px-4 rounded-lg text-white font-semibold cursor-pointer"
                        onClick={() => {
                            Navigate(`/Users/Clients/${project?.ClientId}`);
                        }}
                    >
                        Client Profile
                    </div>
                    {AcceptLoading ? (
                        <div className=" small-loader mx-12"></div>
                    ) : (
                        <div
                            className=" bg-green_v py-2 px-4 rounded-lg text-white font-semibold cursor-pointer"
                            onClick={handle_Accept}
                        >
                            Accept Project
                        </div>
                    )}
                    {RejectLoading ? (
                        <div className=" small-loader mx-12"></div>
                    ) : (
                        <div
                            className=" bg-red-500 py-2 px-4 rounded-lg text-white font-semibold cursor-pointer"
                            onClick={handle_Reject}
                        >
                            Reject Project
                        </div>
                    )}
                </div>
                <div className="w-[90%] mx-auto max-w-[900px] pt-6">
                    <div className="font-semibold text-gray_v text-2xl">
                        {project?.Title}
                    </div>

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
                                        requested frelancer experiance :{" "}
                                        <span className=" font-semibold">
                                            {project?.Frelancer_Experiance}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between w-full pt-2 font-semibold">
                                <div className="text-sm pt-1 text-gray_v">
                                    Expected Deadline : {project?.Expected_Time}
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full  font-semibold">
                                <div className="text-sm pt-1 text-gray_v">
                                    Client Bugdget : {project?.Client_Budget}
                                </div>
                            </div>{" "}
                            <div className="flex items-center justify-between w-full font-semibold">
                                <div className="text-sm pt-1 text-gray_v">
                                    Created at :{" "}
                                    {/* {new Date(
                                        project?.createdAt
                                    ).toLocaleDateString()} */}
                                    {formatDate(project?.createdAt)}
                                    {/* const formattedDate = */}
                                    {/* ; */}
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
