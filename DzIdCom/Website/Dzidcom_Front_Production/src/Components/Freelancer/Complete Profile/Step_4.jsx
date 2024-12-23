import React from "react";
import user_default from "../../../../public/Profile/user_default.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppContext } from "../../../AppContext";
import handleEdite from "./API/Post_EditUser";
import { useState, useEffect, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
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
                        5 - Links and Social Media{" "}
                        <span className=" text-sm font-semibold text-gray_v">
                            (optional)
                        </span>
                    </div>
                    <Formik
                        initialValues={{
                            userId: user?.id,
                            portfolioWebsite: user?.portfolioWebsite || "",
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
                            if (
                                values.portfolioWebsite ==
                                user?.portfolioWebsite
                            ) {
                                delete values.portfolioWebsite;
                            } else if (
                                values.instgram_Link == user?.instgram_Link
                            ) {
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
                                    "/Freelancer/Profile",
                                    imageChanged ? image_state : null,
                                    {
                                        setSubmitting,
                                    }
                                );
                            else {
                                setSubmitting(false);
                                Navigate("/Freelancer/Profile");
                            }
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="  flex flex-col text-sm md:text-lg  gap-9 text-black_text">
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        Portfolio Website{" "}
                                    </div>
                                    <Field
                                        placeholder="https://www.example.com"
                                        type="text"
                                        name="portfolioWebsite"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                    />
                                    <ErrorMessage
                                        name="portfolioWebsite"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className=" relative">
                                    <div className=" font-semibold text-sm pb-1">
                                        your Instgram account Link
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
                                        your LinkedIn account Link
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
                                        your Facebook account Link
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
