import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { SiFreelancer } from "react-icons/si";
import { useLocation } from "react-router";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import List_Card from "./List_Card";
function List() {
    const location = useLocation();
    const projectId = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [Applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [Show_desc, setShow_desc] = useState(false);
    const Toogle_Show_desc = () => {
        setShow_desc(!Show_desc);
    };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const isDraftJSFormat = (str) => {
        try {
            const parsed = JSON.parse(str);
            return parsed.blocks && parsed.entityMap;
        } catch (e) {
            return false;
        }
    };
    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD MMMM YYYY");
    };

    useEffect(() => {
        setLoading(true);
        const fetchProject = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Applications/${projectId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const data = response.data.Applications;

                    setApplicants(data);
                    let contentState;

                    if (data && data[0]?.ProjectDescription) {
                        // Ensure ProjectDescription is defined
                        if (isDraftJSFormat(data[0]?.ProjectDescription)) {
                            contentState = convertFromRaw(
                                JSON.parse(data[0]?.ProjectDescription)
                            );
                        } else {
                            contentState = ContentState.createFromText(
                                data[0]?.ProjectDescription
                            );
                        }
                        setEditorState(
                            EditorState.createWithContent(contentState)
                        );
                    } else {
                        setEditorState(EditorState.createEmpty());
                    }
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

        fetchProject();
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
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-perpol_b pb-6">
                    Project Requirements & Applicants
                </div>
                {!Applicants || Applicants.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray-600 pt-6">
                        No Applications found
                    </div>
                ) : (
                    <div>
                        <div className=" my-6 md:mx-24 ">
                            <div className=" pb-2 font-semibold text-gray_v">
                                Project Requirements
                            </div>
                            <div className=" border p-4 rounded-lg">
                                <div className=" flex gap-2 text-sm font-semibold">
                                    <div>Project Title : </div>
                                    <div className=" text-gray_v">
                                        {Applicants[0]?.Project?.Title}
                                    </div>
                                </div>
                                <div className="text-sm  mb-2 font-semibold text-white">
                                    <div className=" flex gap-2">
                                        {Applicants[0]?.Project
                                            ?.Field_is_Graphic_design && (
                                            <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                                Graphic Design
                                            </div>
                                        )}
                                        {Applicants[0]?.Project
                                            ?.Field_is_Content_creation && (
                                            <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                                Content creation
                                            </div>
                                        )}
                                        {Applicants[0]?.Project
                                            ?.Field_is_SEO_SIM && (
                                            <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                                SEO/SMM
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {Applicants[0]?.Project
                                    ?.Frelancer_Experiance && (
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-sm pt-2 text-gray_v">
                                            requested frelancer experiance :{" "}
                                            <span className=" font-semibold">
                                                {
                                                    Applicants[0]?.Project
                                                        ?.Frelancer_Experiance
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center justify-between w-full pt-2 font-semibold">
                                    <div className="text-sm pt-1 text-gray_v">
                                        Expected Deadline :{" "}
                                        {Applicants[0]?.Project?.Expected_Time}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full  font-semibold">
                                    <div className="text-sm pt-1 text-gray_v">
                                        Client Bugdget :{" "}
                                        {Applicants[0]?.Project?.Client_Budget}
                                    </div>
                                </div>{" "}
                                <div className="flex items-center justify-between w-full font-semibold">
                                    <div className="text-sm pt-1 text-gray_v">
                                        Created at :{" "}
                                        {/* {new Date(
                                        project?.createdAt
                                    ).toLocaleDateString()} */}
                                        {formatDate(
                                            Applicants[0]?.Project?.createdAt
                                        )}
                                        {/* const formattedDate = */}
                                        {/* ; */}
                                    </div>
                                </div>
                            </div>
                            {Show_desc ? (
                                <div>
                                    <div
                                        className="text-sm text-gray_v font-semibold select-none pt-4 text-center flex justify-center items-center cursor-pointer gap-2"
                                        onClick={Toogle_Show_desc}
                                    >
                                        Hide Project Description
                                        <FaAngleUp />
                                    </div>
                                    <div className="text-sm font-semibold pl-6 py-6 text-gray_v">
                                        <Editor
                                            editorState={editorState}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="text-sm text-gray_v font-semibold select-none pt-4 text-center flex justify-center items-center cursor-pointer gap-2"
                                    onClick={Toogle_Show_desc}
                                >
                                    Show Project Description
                                    <FaAngleDown />
                                </div>
                            )}
                        </div>
                        <div className=" py-12 md:mx-24">
                            <div className=" pb-2 font-semibold text-gray_v">
                                applicants
                            </div>
                            <div className="  flex justify-center gap-12 pt-6  flex-wrap ">
                                {Applicants.map((applicant) => {
                                    return (
                                        <List_Card
                                            user={applicant.Freelancer}
                                            projectId={projectId}
                                            application={applicant}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
}

export default List;
