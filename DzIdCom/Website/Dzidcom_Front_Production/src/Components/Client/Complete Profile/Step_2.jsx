import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa";
import handleEdite from "./API/Client_Post_EditUser";
import Delete_Profile_Pic from "./API/Client_Delete_Profile_Pic";
import { useNavigate } from "react-router";

function Step_2() {
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
    if (!user || !set_user) return null;

    return (
        <div className="  flex flex-col items-center justify-center  mt-6 gap-6 ">
            <div className="w-full px-6 md:max-w-[500px] flex flex-col gap-6  ">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-12 w-full ">
                    <div className=" order-2 md:order-1">
                        <div className=" w-full">
                            <input
                                id="Step2_image"
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
                                            .getElementById("Step2_image")
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
                                Profil 40% Completed ✅
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
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                    <div className=" w-[100px] h-2 rounded-lg bg-Rose_v "></div>
                </div>
                <div className=" mb-6">
                    <div className=" font-semibold text-lg text-gray_v pb-6">
                        3 - Company Informations{" "}
                    </div>
                    <Formik
                        initialValues={{
                            userId: user?.id,
                            company_Name: user?.company_Name || "",
                            company_WorkField: user?.company_WorkField || "",
                            company_about: user?.company_about || "",
                            company_Website: user?.company_Website || "",
                            company_Adress: user?.company_Adress || "",
                            company_creationDate:
                                user?.company_creationDate || "",
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.company_Name) {
                                errors.company_Name =
                                    "company Name is Required";
                            } else if (values.company_Name.length > 100)
                                errors.company_Name = "Max 100 chars";
                            if (!values.company_WorkField) {
                                errors.company_WorkField =
                                    "company Work Field is Required";
                            } else if (values.company_WorkField.length > 100)
                                errors.company_WorkField = "Max 100 chars";
                            if (
                                values.company_Adress &&
                                values.company_Adress.length < 10
                            )
                                errors.company_Adress = "at least 10 chars";
                            else if (
                                values.company_Adress &&
                                values.company_Adress.length > 3000
                            )
                                errors.company_Adress = "max 3000 chars";
                            if (
                                values.company_about &&
                                values.company_about.length < 10
                            )
                                errors.company_about = "at least 10 chars";
                            else if (
                                values.company_about &&
                                values.company_about.length > 3000
                            )
                                errors.company_about = "max 3000 chars";
                            if (
                                values.company_Website &&
                                !/^(ftp|http|https):\/\/[^ "]+$/.test(
                                    values.company_Website
                                )
                            ) {
                                errors.company_Website = "Invalid URL";
                            }
                            if (
                                values.company_creationDate &&
                                new Date(values.company_creationDate) >
                                    new Date()
                            ) {
                                errors.company_creationDate = "Invalid Date";
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (
                                values.company_Name &&
                                values.company_Name == user?.company_Name
                            )
                                delete values.company_Name;
                            if (
                                values.company_WorkField &&
                                values.company_WorkField ==
                                    user?.company_WorkField
                            )
                                delete values.company_WorkField;
                            if (
                                values.company_Adress &&
                                values.company_Adress == user?.company_Adress
                            )
                                delete values.company_Adress;
                            if (
                                values.company_about &&
                                values.company_about == user?.company_about
                            )
                                delete values.company_about;
                            if (
                                values.company_Website &&
                                values.company_Website == user?.company_Website
                            )
                                delete values.company_Website;
                            if (!values.company_creationDate)
                                delete values.company_creationDate;
                            else if (
                                values.company_creationDate &&
                                values.company_creationDate ==
                                    user?.company_creationDate
                            )
                                delete values.company_creationDate;
                            if (Object.keys(values).length >= 1 || imageChanged)
                                handleEdite(
                                    values,
                                    set_user,
                                    "/Client/Complete_Profile/Step_3",
                                    imageChanged ? image_state : null,
                                    {
                                        setSubmitting,
                                    }
                                );
                            else {
                                setSubmitting(false);
                                Navigate("/Client/Complete_Profile/Step_3");
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue, values, errors }) => (
                            <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Company Name
                                    </div>
                                    <Field
                                        placeholder=""
                                        type="text"
                                        name="company_Name"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="company_Name"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Work Field
                                    </div>
                                    <Field
                                        placeholder="marketing, development, ..."
                                        type="text"
                                        name="company_WorkField"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="company_WorkField"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Company Website
                                    </div>
                                    <Field
                                        placeholder="https://example.com"
                                        type="text"
                                        name="company_Website"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="company_Website"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Creation Date
                                    </div>
                                    <input
                                        type="date"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "company_creationDate",
                                                e.target.value
                                            )
                                        }
                                        value={values.company_creationDate}
                                        className=" border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="company_creationDate"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Tell us about your Company{" "}
                                    </div>
                                    <Field
                                        placeholder="Willaya , cité ..."
                                        as="textarea"
                                        rows={3}
                                        name="company_Adress"
                                        disabled={isSubmitting}
                                        className=" resize-none border custom-overflow border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="company_Adress"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Tell us about your Company{" "}
                                    </div>
                                    <Field
                                        placeholder="description"
                                        as="textarea"
                                        rows={7}
                                        name="company_about"
                                        disabled={isSubmitting}
                                        className=" resize-none border custom-overflow border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="company_about"
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
export default Step_2;
