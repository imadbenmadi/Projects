import React from "react";
import user_default from "../../../../public/Profile/user_default.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect, useRef } from "react";

import { FaRegImage } from "react-icons/fa";
import handleEdite from "./API/Client_Post_EditUser";
import Delete_Profile_Pic from "./API/Client_Delete_Profile_Pic";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router";
function Step_1() {
    const Navigate = useNavigate();
    const [image_state, setimage_state] = useState(null);
    const { user, set_user, isProfileCompleted } = useAppContext();
    const [imageDeleteLoading, setimageDeleteLoading] = useState(false);
    const [imageChanged, setimageChanged] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    // async function handleEdite(
    //     values,
    //     set_user,
    //     Link,
    //     image_state,
    //     { setSubmitting }
    // ) {
    //     setSubmitting(true);
    //     try {
    //         if (image_state) {
    //             let formData = new FormData();
    //             formData.append("ProfilePic", image_state);
    //             let Image_Response = await Axios.post(
    //                 `https://api.dzidcom.com/upload/Client/ProfilePic`,
    //                 formData,
    //                 {
    //                     withCredentials: true,
    //                     validateStatus: () => true,
    //                 }
    //             );
    //             if (Image_Response.status == 200) {
    //                 // set_user({
    //                 //     profile_pic_link: Image_Response.data.profile_pic_link,
    //                 // });
    //             } else if (Image_Response.status == 401) {
    //                 // Swal.fire("Error", `${Image_Response.data.message} `, "error");
    //                 Navigate("/Login");
    //             } else if (Image_Response.status == 400) {
    //                 Swal.fire(
    //                     "Error",
    //                     `${Image_Response.data.message} `,
    //                     "error"
    //                 );
    //             } else if (Image_Response.status == 409) {
    //                 Swal.fire(
    //                     "Error!",
    //                     `${Image_Response.data.message} `,
    //                     "error"
    //                 );
    //             } else if (Image_Response.status == 500) {
    //                 Swal.fire("Error!", `Internal Server Error   `, "error");
    //             } else {
    //                 Swal.fire(
    //                     "Error!",
    //                     `Something Went Wrong ,please trye again latter, ${Image_Response.data.message} `,
    //                     "error"
    //                 );
    //             }
    //         }
    //         let response = await Axios.put(
    //             `https://api.dzidcom.com/Clients/${values.userId}/Profile`,
    //             values,
    //             {
    //                 withCredentials: true,
    //                 validateStatus: () => true,
    //             }
    //         );
    //         if (response.status == 200) {
    //             set_user(response.data.user);
    //             if (Link) {
    //                 Navigate(Link);
    //             }
    //         } else if (response.status == 401) {
    //             Navigate("/Login");
    //         } else if (response.status == 400) {
    //             setSubmitting(false);
    //             Swal.fire("Error", `${response.data.message} `, "error");
    //         } else if (response.status == 409) {
    //             setSubmitting(false);
    //             Swal.fire("Error!", `${response.data.message} `, "error");
    //         } else if (response.status == 500) {
    //             setSubmitting(false);
    //             Swal.fire("Error!", `Internal Server Error   `, "error");
    //         } else {
    //             setSubmitting(false);
    //             Swal.fire(
    //                 "Error!",
    //                 `Something Went Wrong ,please trye again latter, ${response.data.message} `,
    //                 "error"
    //             );
    //         }
    //     } catch (error) {
    //         setSubmitting(false);
    //         Swal.fire(
    //             "Error!",
    //             `Something Went Wrong ,please trye again latter`,
    //             "error"
    //         );
    //     }

    //     // setSubmitting(false);
    // }
    return (
        <div className="  flex flex-col items-center justify-center  mt-6 gap-6 ">
            <div className="w-full px-6 md:max-w-[500px] flex flex-col gap-6  ">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-12 w-full ">
                    <div className=" order-2 md:order-1">
                        <div className=" w-full">
                            <input
                                id="Step1_image"
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
                                            "https://api.dzidcom.com/" +
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
                                            .getElementById("Step1_image")
                                            .click()
                                    }
                                >
                                    <FaRegImage className=" text-gray_v text-2xl" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className=" order-1  md:order-2">
                        {!isProfileCompleted && (
                            <div className=" font-semibold text-gray_v pt-6">
                                Profil 20% Completed ✅
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
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                </div>
                <div className=" mb-6">
                    <div className=" font-semibold text-lg text-gray_v pb-6">
                        2 - Personal information{" "}
                    </div>
                    <Formik
                        initialValues={{
                            userId: user?.id,
                            telephone: user?.telephone || "",
                            nationalCardNumber: user?.nationalCardNumber || "",
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (!values.telephone) {
                                errors.telephone = "telephone is Required";
                            } else if (
                                values.telephone.length < 9 ||
                                values.telephone.length > 14
                            )
                                errors.telephone = "invalide phone number";
                            else if (
                                !/^(\+\d{1,3}[-\s]?)?\d+$/.test(
                                    values.telephone
                                )
                            )
                                errors.telephone = "invalide phone number";
                            if (!values.nationalCardNumber) {
                                errors.nationalCardNumber =
                                    "Last Name is Required";
                            } else if (!/^\d+$/.test(values.nationalCardNumber))
                                errors.nationalCardNumber =
                                    "National Card Number must be a number";
                            else if (values.nationalCardNumber.length < 9)
                                errors.nationalCardNumber =
                                    " At least 10 chars";

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.telephone == user?.telephone) {
                                delete values.telephone;
                            } else if (
                                values.nationalCardNumber ==
                                user?.nationalCardNumber
                            ) {
                                delete values.nationalCardNumber;
                            } else if (values.JobTitle == user?.JobTitle) {
                                delete values.JobTitle;
                            }
                            if (Object.keys(values).length >= 1 || imageChanged)
                                handleEdite(
                                    values,
                                    set_user,
                                    "/Client/Complete_Profile/Step_2",
                                    // null,
                                    imageChanged ? image_state : null,
                                    {
                                        setSubmitting,
                                    }
                                );
                            else {
                                setSubmitting(false);
                                Navigate("/Client/Complete_Profile/Step_2");
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Phone Number{" "}
                                    </div>
                                    <Field
                                        placeholder="0655555555"
                                        type="text"
                                        name="telephone"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="telephone"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        National Card Number{" "}
                                    </div>
                                    <Field
                                        placeholder="••••••••••••••••••••••••••••••••••••••••"
                                        type="text"
                                        name="nationalCardNumber"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="nationalCardNumber"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                {isSubmitting ? (
                                    <span className="small-loader  w-full m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" bg-perpol_v py-2 rounded-2xl text-white font-semibold "
                                        disabled={isSubmitting}
                                    >
                                        Continue
                                    </button>
                                )}
                            </Form>
                        )}
                    </Formik>
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
export default Step_1;
