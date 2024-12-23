import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function JobItem() {
    const { user } = useAppContext();
    const Navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Location = useLocation();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const job_id = location.pathname.split("/")[3];
    if (!job_id) {
        Navigate("/Freelancer/Jobs");
    }
    const isDraftJSFormat = (str) => {
        try {
            const parsed = JSON.parse(str);
            return parsed.blocks && parsed.entityMap;
        } catch (e) {
            return false;
        }
    };
    const handle_Application = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Freelancers/Jobs/${job_id}/Apply`,
                {
                    // freelancerId: user?.id,
                    Freelancer_Time_Needed: values.Freelancer_Time_Needed,
                    Freelancer_Budget: values.Freelancer_Budget,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "Application Sent Seuccessfully",
                    "success"
                );
                Navigate("/Freelancer/Jobs");
            } else if (response.status === 401) {
                Swal.fire("Error", "You should log in again", "error");
                Navigate("/Login");
            } else {
                Swal.fire("Error", response.data.message, "error");
                // setError(response.data);
            }
        } catch (error) {
            Swal.fire("Error", response.data.message, "error");
            // setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Freelancers/Jobs/${job_id}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const job = response.data.project;
                    setJob(job);
                    let contentState;
                    if (isDraftJSFormat(job.Description)) {
                        contentState = convertFromRaw(
                            JSON.parse(job.Description)
                        );
                    } else {
                        contentState = ContentState.createFromText(
                            job.Description
                        );
                    }
                    setEditorState(EditorState.createWithContent(contentState));
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
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
        fetchJob();
    }, []);
    if (loading)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    return (
        <div className=" w-[90%] mx-auto max-w-[1000px] pt-6 flex flex-col justify-center items-center md:flex-row">
            <div className=" w-[70%] shrink-0 px-12">
                <div className=" text-lg text-gray_v font-semibold pb-4">
                    To apply to this job you should complete the form
                </div>
                <div className=" border rounded-lg p-4 flex flex-col   my-4">
                    <div className="text-sm  mb-6 font-semibold ">
                        <div className=" text-gray_v text-lg">{job?.Title}</div>
                        <div className=" flex gap-2 text-white">
                            {job?.Field_is_Graphic_design && (
                                <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                    Graphic Design
                                </div>
                            )}
                            {job?.Field_is_Content_creation && (
                                <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                    Content creation
                                </div>
                            )}
                            {job?.Field_is_SEO_SIM && (
                                <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                    SEO/SMM
                                </div>
                            )}
                        </div>
                    </div>

                    {job?.Frelancer_Experiance && (
                        <div className="flex items-center justify-between w-full">
                            <div className="text-sm pt-2 text-gray_v">
                                frelancer experiance :{" "}
                                <span className=" font-semibold">
                                    {job?.Frelancer_Experiance}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between w-full font-semibold">
                        <div className="text-sm pt-1 text-gray_v">
                            Created at :{" "}
                            {/* {new Date(job?.createdAt).toLocaleDateString()} */}
                            {dayjs(job?.createdAt).format("DD MMMM YYYY")}
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        {job?.Description && (
                            <div className="text-sm py-6 text-gray_v ">
                                {/* {job?.Description} */}
                                <div className=" text-sm pb-6 font-semibold">
                                    <span className=" underline">
                                        Project Description
                                    </span>
                                    <span className=" text-xs">
                                        {" "}
                                        (Read it well before Applying)
                                    </span>
                                </div>
                                <Editor
                                    editorState={editorState}
                                    readOnly={true}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" w-[30%] shrink-0 px-4 pt-6">
                <Formik
                    initialValues={{
                        Freelancer_Time_Needed: "",
                        Freelancer_Budget: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.Freelancer_Time_Needed)
                            errors.Freelancer_Time_Needed =
                                "Time needed is required Required";
                        if (!values.Freelancer_Budget)
                            errors.Freelancer_Budget =
                                "Buget is required Required";
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        handle_Application(values, {
                            setSubmitting,
                        });
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    How long will this project take? {" "}
                                </div>
                                <Field
                                    placeholder="3 months"
                                    type="text"
                                    name="Freelancer_Time_Needed"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                />
                                <ErrorMessage
                                    name="Freelancer_Time_Needed"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <div className=" relative">
                                <div className=" font-semibold text-sm pb-1">
                                    Your price : (DA)
                                </div>
                                <Field
                                    placeholder="15000 DA"
                                    type="text"
                                    name="Freelancer_Budget"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                />
                                <ErrorMessage
                                    name="Freelancer_Budget"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            {isSubmitting ? (
                                <span className="small-loader  w-full m-auto mb-6"></span>
                            ) : (
                                <button
                                    type="submit"
                                    className=" bg-perpol_v py-2 rounded-2xl mb-6 text-white font-semibold "
                                    disabled={isSubmitting}
                                >
                                    Apply
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
const errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};
export default JobItem;
