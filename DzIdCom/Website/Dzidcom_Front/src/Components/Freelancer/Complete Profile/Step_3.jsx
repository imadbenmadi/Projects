import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { FaRegImage } from "react-icons/fa";
import handleEdite from "./API/Post_EditUser";
import Delete_Profile_Pic from "./API/Delete_Profile_Pic";
import { useNavigate } from "react-router";

function Step_3() {
    const Navigate = useNavigate();

    const [stillWorking, setstillWorking] = useState(false);
    const [addProjectClicked, setAddProjectClicked] = useState(false);
    function toogleAddProject() {
        setAddProjectClicked(!addProjectClicked);
    }
    const [image_state, setimage_state] = useState(null);
    const { user, set_user, isProfileCompleted } = useAppContext();
    if (!user || !set_user) return null;

    const [deltedProject_Loading, setdeltedProject_Loading] = useState(null);
    const handleRemoveProject = async (projectId, user, set_user) => {
        setdeltedProject_Loading(true);

        // Filter out the project to be removed
        const updatedPortfolioItems = user?.PortfolioItems.filter(
            (item) => item.id !== projectId
        );

        try {
            let response = await Axios.put(
                `http://localhost:3000/Freelancers/${user?.id}/Profile`,
                { PortfolioItems: updatedPortfolioItems }, // Send the updated list to the backend
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                const updatedUser = {
                    ...user,
                    Skills: response.data.Skills,
                    PortfolioItems: response.data.PortfolioItems,
                };
                set_user(updatedUser);
            } else {
                Swal.fire("Error", `${response.data.message}`, "error");
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something went wrong, please try again later`,
                "error"
            );
        }

        setdeltedProject_Loading(false);
    };
    const [imageDeleteLoading, setimageDeleteLoading] = useState(false);
    const [imageChanged, setimageChanged] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    return (
        <div className="  flex flex-col items-center justify-center  mt-6 gap-6 ">
            <div className="w-full px-6 md:max-w-[500px] flex flex-col gap-6  ">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-12 w-full ">
                    <div className=" order-2 md:order-1">
                        <div className=" w-full">
                            <input
                                id="Step3_image"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(event) => {
                                    setimage_state(
                                        event.currentTarget.files[0]
                                    );
                                }}
                                ref={fileInputRef}
                                // disabled={isSubmitting}
                                className="hidden" // Hide the default file input button
                            />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            {user?.profile_pic_link ? (
                                <>
                                    <img
                                        src={
                                            "http://localhost:3000/" +
                                            user?.profile_pic_link
                                        }
                                        alt="Profile Pic"
                                        className=" w-[150px] h-[150px] object-cover rounded-full"
                                    />
                                    {imageDeleteLoading ? (
                                        <span className="small-loader mt-5"></span>
                                    ) : (
                                        <div
                                            className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                            onClick={() => {
                                                Delete_Profile_Pic(
                                                    setimageDeleteLoading,
                                                    set_user,
                                                    setimage_state
                                                );
                                            }}
                                        >
                                            {/* <IoClose /> */}
                                            Remove
                                        </div>
                                    )}
                                </>
                            ) : image_state ? (
                                <div className=" relative ">
                                    <img
                                        src={URL.createObjectURL(image_state)} // Create a URL for the selected image
                                        alt="Selected Image"
                                        // ref={fileInputRef}
                                        className=" w-[150px] h-[150px]  object-cover rounded-full"
                                    />
                                    <div
                                        className="  mt-2 text-white w-fit mx-auto rounded-lg px-3 font-semibold text-lg
                                         bg-gray-400 cursor-pointer"
                                        onClick={() => {
                                            setimage_state(null);
                                            // setimageChanged(false);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                            }
                                        }}
                                    >
                                        {/* <IoClose /> */}
                                        Cancel
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="w-[150px] h-[150px]  bg-gray_white text-gray rounded-full flex items-center justify-center cursor-pointer"
                                    onClick={() =>
                                        document
                                            .getElementById("Step3_image")
                                            .click()
                                    }
                                >
                                    <FaRegImage className=" text-gray_v text-2xl" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className=" order-1  md:order-2">
                        {(!isProfileCompleted ||
                            !user?.PortfolioItems ||
                            !user?.PortfolioItems.length > 0) && (
                            <div className=" font-semibold text-gray_v pt-6">
                                Profil 60% Completed ✅
                            </div>
                        )}

                        <div className=" flex flex-col gap-1 pt-2 text-sm font-semibold text-gray_v">
                            <div className=" break-all">
                                {user?.firstName && user?.firstName}
                            </div>
                            <div className=" break-all">
                                {user?.lastName && user?.lastName}
                            </div>
                            <div className=" break-all">
                                {user?.email && user?.email}{" "}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Progress*/}
                <div className=" flex items-center justify-start gap-5">
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                </div>
                <div className=" mb-6">
                    <div className=" font-semibold text-lg text-gray_v pb-6">
                        4 - Portfolio{" "}
                        <span className=" text-sm font-semibold">
                            Your past work and projects
                        </span>
                    </div>
                    <div>
                        {!addProjectClicked ? (
                            !user?.PortfolioItems ||
                            user?.PortfolioItems.length == 0 ? (
                                <div className=" flex flex-col items-center justify-center gap-6">
                                    <div className=" text-center flex items-center justify-center gap-2 text-gray_v ">
                                        <div>
                                            <IoWarningOutline className=" text-xl" />
                                        </div>
                                        <div>You have no Projects</div>
                                    </div>
                                    <div
                                        className=" text-center flex items-center justify-center gap-2 text-white font-semibold 
                                        cursor-pointer bg-perpol_v px-4 py-2 rounded-lg"
                                        onClick={toogleAddProject}
                                    >
                                        {/* <IoMdAddCircleOutline className=" font-bold text-2xl"/> */}
                                        Add a Project
                                    </div>
                                    <a
                                        href="/Freelancer/Complete_Profile/Step_4"
                                        className="text-sm font-semibold underline text-red-500 cursor-pointer pt-6"
                                    >
                                        Skip this Step
                                    </a>
                                </div>
                            ) : (
                                <div>
                                    <div
                                        className=" flex items-center justify-center gap-1 cursor-pointer text-xl text-perpol_v underline font-semibold  pb-4"
                                        onClick={toogleAddProject}
                                    >
                                        <IoMdAddCircleOutline className=" font-bold text-2xl" />
                                        Add an item
                                    </div>
                                    <div className=" flex flex-col gap-6">
                                        {user?.PortfolioItems &&
                                            user?.PortfolioItems.map(
                                                (project) => (
                                                    <div
                                                        key={project.id}
                                                        className="w-[90%] mx-auto md:mx-0 md:max-w-[500px] break-words overflow-hidden flex flex-col gap-5 font-semibold border border-gray_white rounded-lg p-4"
                                                    >
                                                        <div className=" font-semibold text-lg text-gray_v">
                                                            {project?.title}
                                                        </div>
                                                        <div className=" text-sm text-gray_v">
                                                            {
                                                                project?.description
                                                            }
                                                        </div>
                                                        <div className=" flex items-center gap-2 text-sm text-gray_v">
                                                            <div>
                                                                {/* {new Date(
                                                                    project.startDate
                                                                ).toLocaleDateString()} */}
                                                                {dayjs(
                                                                    project?.startDate
                                                                ).format(
                                                                    "DD MMMM YYYY"
                                                                )}
                                                            </div>
                                                            <div className=" flex gap-2">
                                                                <div> -</div>
                                                                {/* {project.endDate &&
                                                                    new Date(
                                                                        project.endDate
                                                                    ).toLocaleDateString()} */}
                                                                {project.endDate &&
                                                                    dayjs(
                                                                        project?.endDate
                                                                    ).format(
                                                                        "DD MMMM YYYY"
                                                                    )}
                                                            </div>
                                                            <div className="  font-semibold">
                                                                {project.stillWorking
                                                                    ? "Still Working"
                                                                    : ""}
                                                            </div>
                                                        </div>
                                                        {project.livePreviewLink && (
                                                            <div className=" flex gap-2 ">
                                                                <div className=" font-semibold text-gray_v">
                                                                    preview link
                                                                    :
                                                                </div>

                                                                <a
                                                                    href={
                                                                        project?.livePreviewLink
                                                                    }
                                                                    className=" underline text-perpol_v"
                                                                >
                                                                    {
                                                                        project?.livePreviewLink
                                                                    }
                                                                </a>
                                                            </div>
                                                        )}

                                                        <div>
                                                            {deltedProject_Loading ? (
                                                                <span className="small-loader"></span>
                                                            ) : (
                                                                <div className=" flex items-center gap-2">
                                                                    <div
                                                                        className=" text-white font-semibold
                                                                         bg-red-600 px-4 py-2 rounded-lg cursor-pointer"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleRemoveProject(
                                                                                project.id,
                                                                                user,
                                                                                set_user
                                                                            )
                                                                        }
                                                                    >
                                                                        Remove
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>

                                    <div
                                        className=" bg-perpol_v gap-1 cursor-pointer text-xl text-white mt-6 
                                        flex items-center justify-center 
                                             font-semibold px-4 py-2 rounded-lg"
                                        onClick={() => {
                                            Navigate(
                                                "/Freelancer/Complete_Profile/Step_4"
                                            );
                                        }}
                                    >
                                        Continue
                                    </div>
                                </div>
                            )
                        ) : (
                            <div>
                                <Formik
                                    initialValues={{
                                        userId: user?.id,
                                        title: "",
                                        description: "",
                                        startDate: "",
                                        endDate: "",
                                        livePreviewLink: "",
                                        stillWorking: false,
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.title) {
                                            errors.title = "Title is required";
                                        } else if (values.title.length < 5) {
                                            errors.title =
                                                "Title must be at least 5 characters";
                                        } else if (values.title.length > 200) {
                                            errors.title =
                                                "Title cannot exceed 200 characters";
                                        }

                                        if (!values.description) {
                                            errors.description =
                                                "Description is required";
                                        } else if (
                                            values.description.length < 10
                                        ) {
                                            errors.description =
                                                "Description must be at least 10 characters";
                                        } else if (
                                            values.description.length > 1500
                                        ) {
                                            errors.description =
                                                "Description cannot exceed 1500 characters";
                                        }

                                        if (!values.startDate) {
                                            errors.startDate =
                                                "Start Date is required";
                                        } else if (
                                            new Date(values.startDate) >
                                            new Date()
                                        ) {
                                            errors.startDate =
                                                "Start Date cannot be in the future";
                                        }

                                        if (
                                            !values.endDate &&
                                            !values.stillWorking
                                        ) {
                                            errors.endDate =
                                                "End Date is required";
                                        } else if (
                                            new Date(values.endDate) >
                                            new Date()
                                        ) {
                                            errors.endDate =
                                                "End Date cannot be in the future";
                                        } else if (
                                            !values.stillWorking &&
                                            new Date(values.startDate) >
                                                new Date(values.endDate)
                                        ) {
                                            errors.endDate =
                                                "End Date must be after Start Date";
                                        }
                                        if (
                                            values.livePreviewLink &&
                                            !values.livePreviewLink.match(
                                                /^(ftp|http|https):\/\/[^ "]+$/
                                            )
                                        ) {
                                            errors.livePreviewLink =
                                                "Invalid URL";
                                        }

                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        if (stillWorking) delete values.endDate;
                                        const formattedData = {
                                            userId: values.userId,
                                            // PortfolioItems: [
                                            //     values.title,
                                            //     values.description,
                                            //     values.startDate,
                                            //     values.endDate,
                                            //     values.livePreviewLink,
                                            //     values.stillWorking,
                                            // ],
                                            PortfolioItems: [
                                                ...user?.PortfolioItems,
                                                {
                                                    title: values.title,
                                                    description:
                                                        values.description,
                                                    startDate: values.startDate,
                                                    endDate: values.endDate,
                                                    livePreviewLink:
                                                        values.livePreviewLink,
                                                    stillWorking:
                                                        values.stillWorking,
                                                    ImageLink: values.ImageLink, // Include this if you have it in values
                                                },
                                            ],
                                        };
                                        handleEdite(
                                            formattedData,
                                            set_user,
                                            null,
                                            imageChanged ? image_state : null,
                                            {
                                                setSubmitting,
                                            }
                                        );
                                        window.location.reload();
                                        // setAddProjectClicked(false);
                                    }}
                                >
                                    {({
                                        isSubmitting,
                                        setFieldValue,
                                        values,
                                        errors,
                                    }) => (
                                        <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                                            <div className=" relative">
                                                <div className=" font-semibold text-sm pb-1">
                                                    Title
                                                </div>
                                                <Field
                                                    placeholder="Tell us title your self"
                                                    type="text"
                                                    name="title"
                                                    disabled={isSubmitting}
                                                    className="  border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                                />
                                                <ErrorMessage
                                                    name="title"
                                                    component="div"
                                                    style={errorInputMessage}
                                                />
                                            </div>
                                            <div className=" relative">
                                                <div className=" font-semibold text-sm pb-1">
                                                    Description
                                                </div>
                                                <Field
                                                    placeholder="add description "
                                                    as="textarea"
                                                    rows={7}
                                                    name="description"
                                                    disabled={isSubmitting}
                                                    className=" resize-none border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                                />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    style={errorInputMessage}
                                                />
                                            </div>
                                            <div className=" relative">
                                                <div className=" font-semibold text-sm pb-1">
                                                    Start Date
                                                </div>
                                                <input
                                                    type="date"
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            "startDate",
                                                            e.target.value
                                                        )
                                                    }
                                                    value={values.startDate}
                                                    className=" border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                                />
                                                <ErrorMessage
                                                    name="startDate"
                                                    component="div"
                                                    style={errorInputMessage}
                                                />
                                            </div>
                                            <div className=" relative">
                                                <div className=" font-semibold text-sm pb-1">
                                                    End Date
                                                </div>
                                                <input
                                                    type="date"
                                                    onChange={(e) =>
                                                        setFieldValue(
                                                            "endDate",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        stillWorking
                                                            ? true
                                                            : false
                                                    }
                                                    value={values.endDate}
                                                    className=" border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                                />
                                                <ErrorMessage
                                                    name="endDate"
                                                    component="div"
                                                    style={errorInputMessage}
                                                />
                                            </div>
                                            <div className=" flex items-center justify-start ml-4 gap-2 text-sm font-semibold">
                                                <div>Still Working </div>
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        setFieldValue(
                                                            "stillWorking",
                                                            e.target.checked
                                                        );
                                                        setstillWorking(
                                                            e.target.checked
                                                        );
                                                    }}
                                                    value={values.stillWorking}
                                                />
                                            </div>
                                            <div className=" relative">
                                                <div className=" font-semibold text-sm pb-1">
                                                    preview link
                                                </div>
                                                <Field
                                                    placeholder="https://www.example.com"
                                                    type="text"
                                                    name="livePreviewLink"
                                                    disabled={isSubmitting}
                                                    className="  border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                                />
                                                <ErrorMessage
                                                    name="livePreviewLink"
                                                    component="div"
                                                    style={errorInputMessage}
                                                />
                                            </div>
                                            <div className=" flex items-center justify-center gap-12 ">
                                                <div>
                                                    {isSubmitting ? (
                                                        <span className="small-loader  w-full m-auto"></span>
                                                    ) : (
                                                        <button
                                                            type="submit"
                                                            className=" bg-perpol_v w-[100px] py-2 rounded-xl text-white font-semibold "
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                        >
                                                            Save
                                                        </button>
                                                    )}
                                                </div>
                                                <div
                                                    onClick={toogleAddProject}
                                                    className=" bg-red-500 w-[100px] py-2 rounded-xl text-white font-semibold text-center cursor-pointer"
                                                    disabled={isSubmitting}
                                                >
                                                    Cancel
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        )}
                    </div>
                </div>
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
export default Step_3;
