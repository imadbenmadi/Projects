import React from "react";
import user_default from "../../../../public/Profile/user_default.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import handleEdite from "./API/Client_Post_EditUser";
import { useState, useEffect, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router";

function Step_1() {
    const Navigate = useNavigate();

    const { user, set_user, isProfileCompleted } = useAppContext();
    if (!user || !set_user) return null;
    const [image_state, setimage_state] = useState(null);
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
        <div className=" flex flex-col items-center justify-center  mt-6 gap-6 ">
            <div className="w-full px-6 md:max-w-[500px]  flex flex-col gap-6  ">
                <div className=" flex flex-col md:flex-row items-center justify-start gap-12 w-full ">
                    <div className=" order-2 md:order-1">
                        <div className=" w-full">
                            <input
                                id="Step4_image"
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
                                            .getElementById("Step4_image")
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
                            !user?.instgram_Link ||
                            !user?.linkedIn_Link ||
                            !user?.facebook_Link ||
                            !user?.portfolioWebsite) && (
                            <div className=" font-semibold text-gray_v pt-6">
                                Profil 80% Completed ✅
                            </div>
                        )}

                        <div className=" flex flex-col gap-1 pt-2 text-sm font-semibold text-gray_v">
                            <div>{user?.firstName}</div>
                            <div>{user?.lastName}</div>
                            <div>{user?.email}</div>
                        </div>
                    </div>
                </div>
                {/* Progress*/}
                <div className=" flex items-center justify-start gap-5">
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_b_v "></div>
                </div>
                <div className=" mb-6">
                    <div className=" font-semibold text-lg text-gray_v pb-6">
                        4 - Links and Social Media{" "}
                        <span className=" text-sm font-semibold text-gray_v">
                            (optional)
                        </span>
                    </div>
                    <Formik
                        initialValues={{
                            userId: user?.id,
                            instgram_Link: user?.instgram_Link || "",
                            linkedIn_Link: user?.linkedIn_Link || "",
                            facebook_Link: user?.facebook_Link || "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (
                                values.portfolioWebsite &&
                                !/^(ftp|http|https):\/\/[^ "]+$/.test(
                                    values.portfolioWebsite
                                )
                            ) {
                                errors.portfolioWebsite = "Invalid URL";
                            }
                            if (
                                values.instgram_Link &&
                                !/^(ftp|http|https):\/\/[^ "]+$/.test(
                                    values.instgram_Link
                                )
                            ) {
                                errors.instgram_Link = "Invalid URL";
                            }
                            if (
                                values.linkedIn_Link &&
                                !/^(ftp|http|https):\/\/[^ "]+$/.test(
                                    values.linkedIn_Link
                                )
                            ) {
                                errors.linkedIn_Link = "Invalid URL";
                            }
                            if (
                                values.facebook_Link &&
                                !/^(ftp|http|https):\/\/[^ "]+$/.test(
                                    values.facebook_Link
                                )
                            ) {
                                errors.facebook_Link = "Invalid URL";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.instgram_Link == user?.instgram_Link) {
                                delete values.instgram_Link;
                            } else if (
                                values.linkedIn_Link == user?.linkedIn_Link
                            ) {
                                delete values.linkedIn_Link;
                            } else if (
                                values.facebook_Link == user?.facebook_Link
                            ) {
                                delete values.facebook_Link;
                            }
                            if (Object.keys(values).length >= 1 || imageChanged)
                                handleEdite(
                                    values,
                                    set_user,
                                    "/Client/Profile",
                                    imageChanged ? image_state : null,
                                    {
                                        setSubmitting,
                                    }
                                );
                            else {
                                setSubmitting(false);
                                Navigate("/Client/Profile");
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Instgram account Link
                                    </div>
                                    <Field
                                        placeholder="https://www.example.com"
                                        type="instgram_Link"
                                        name="instgram_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="instgram_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        LinkedIn account Link
                                    </div>
                                    <Field
                                        placeholder="https://www.example.com"
                                        type="linkedIn_Link"
                                        name="linkedIn_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="linkedIn_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Facebook account Link
                                    </div>
                                    <Field
                                        placeholder="https://www.example.com"
                                        type="facebook_Link"
                                        name="facebook_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="facebook_Link"
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
