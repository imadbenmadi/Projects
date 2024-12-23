import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../AppContext";
import Swal from "sweetalert2";
import Axios from "axios";
import { FaRegImage } from "react-icons/fa";
import Delete_Profile_Pic from "./Api/Delete_Profile_Pic";

function Edit_Profile() {
    const { user, set_user } = useAppContext();
    const fileInputRef = useRef(null);
    const [imageChanged, setimageChanged] = useState(false);
    const [image_state, setimage_state] = useState(null);
    const [imageDeleteLoading, setimageDeleteLoading] = useState(false);

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);
    return (
        <div className="w-full bg-white flex flex-col items-center py-12">
            <div className="text-black_text">
                <div className="text-3xl font-semibold">Edit Profile</div>

                <div>
                    <Formik
                        initialValues={{
                            firstName: user?.firstName || "",
                            lastName: user?.lastName || "",
                            email: user?.email || "",
                            telephone: user?.telephone || "",
                            instgram_Link: user?.instgram_Link || "",
                            linkedIn_Link: user?.linkedIn_Link || "",
                            facebook_Link: user?.facebook_Link || "",
                            // password: user?.password || "",
                            profile_pic_link: user?.profile_pic_link || "",
                            TeacherId: user?.id,
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (!values.firstName) {
                                errors.firstName = "firstName is Required";
                            } else if (values.firstName.length < 3)
                                errors.firstName = "At least 3 chars";
                            else if (values.firstName.length > 30)
                                errors.firstName = "At most 30 chars";

                            if (!values.lastName) {
                                errors.lastName = "lastName is Required";
                            } else if (values.lastName.length < 3)
                                errors.lastName = "At least 3 chars";
                            else if (values.lastName.length > 30)
                                errors.lastName = "At most 30 chars";

                            if (!values.email) {
                                errors.email = "email is Required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                )
                            ) {
                                errors.email = "Invalid email Editress";
                            }

                            // if (!values.password) {
                            //     errors.password = "password is Required";
                            // } else if (values.password.length < 8) {
                            //     errors.password =
                            //         "password must be at least 8 characters long";
                            // }
                            if (
                                (values.telephone &&
                                    values.telephone.length < 6) ||
                                isNaN(values.telephone) ||
                                values.telephone.length > 11
                            ) {
                                errors.telephone = "Invalid phone number";
                            }
                            if (
                                values.instgram_Link &&
                                !/^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(
                                    values.instgram_Link
                                )
                            ) {
                                errors.instgram_Link = "Invalid Instagram Link";
                            }
                            if (
                                values.linkedIn_Link &&
                                !/^(https?:\/\/)?(www\.)?linkedin.com\/[a-zA-Z0-9_.]+\/?$/.test(
                                    values.linkedIn_Link
                                )
                            ) {
                                errors.linkedIn_Link = "Invalid LinkedIn Link";
                            }
                            if (
                                values.facebook_Link &&
                                !/^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9_.]+\/?$/.test(
                                    !values.facebook_Link
                                )
                            ) {
                                errors.facebook_Link = "Invalid Facebook Link";
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            if (!values.TeacherId) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Unauthorized: missing userId",
                                    "error"
                                );
                            } else {
                                try {
                                    if (image_state) {
                                        let formData = new FormData();
                                        formData.append(
                                            "ProfilePic",
                                            image_state
                                        );
                                        let Image_Response = await Axios.post(
                                            `http://localhost:3000/upload/Teacher/ProfilePic`,
                                            formData,
                                            {
                                                withCredentials: true,
                                                validateStatus: () => true,
                                            }
                                        );

                                        if (Image_Response.status == 401) {
                                            // Swal.fire("Error", `${Image_Response.data.message} `, "error");
                                            window.location.href = "/Login";
                                        }
                                    }
                                    let response = await Axios.put(
                                        `http://localhost:3000/Teachers/${values.TeacherId}/Profile`,
                                        values,
                                        {
                                            withCredentials: true,
                                            validateStatus: () => true,
                                        }
                                    );

                                    if (response.status === 200) {
                                        set_user(response.data.user);

                                        window.location.href =
                                            "/Teacher/Profile";
                                    } else if (response.status === 400) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `${response.data.message}`,
                                            "error"
                                        );
                                    } else if (response.status === 409) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `${response.data.message}`,
                                            "error"
                                        );
                                    } else if (response.status === 500) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            "Internal Server Error",
                                            "error"
                                        );
                                    } else {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `Something Went Wrong, please try again later, ${response.data.message}`,
                                            "error"
                                        );
                                    }
                                } catch (error) {
                                    setSubmitting(false);
                                    Swal.fire(
                                        "Error",
                                        "Something Went Wrong, please try again later",
                                        "error"
                                    );
                                }
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col text-sm md:text-lg gap-4 text-black_text">
                                <div className=" w-full">
                                    <input
                                        id="image"
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
                                                src={URL.createObjectURL(
                                                    image_state
                                                )} // Create a URL for the selected image
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
                                                        fileInputRef.current.value =
                                                            "";
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
                                                    .getElementById("image")
                                                    .click()
                                            }
                                        >
                                            <FaRegImage className=" text-gray_v text-2xl" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full pb-6">
                                    <div className="w-full md:w-[50%] relative">
                                        <div className="font-semibold text-sm pb-1">
                                            First Name
                                        </div>
                                        <Field
                                            placeholder="firstName"
                                            type="text"
                                            name="firstName"
                                            disabled={isSubmitting}
                                            className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm"
                                        />
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                    <div className="w-full md:w-[50%] relative">
                                        <div className="font-semibold text-sm pb-1">
                                            Last Name
                                        </div>
                                        <Field
                                            placeholder="lastName"
                                            type="text"
                                            name="lastName"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                        />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            style={names_errorInputMessage}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Email
                                    </div>
                                    <Field
                                        placeholder="Email"
                                        type="text"
                                        name="email"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Telephone
                                        <div>
                                            <Field
                                                placeholder="telephone"
                                                type="number"
                                                name="telephone"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                            />
                                            <ErrorMessage
                                                name="telephone"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Instagram Link
                                    </div>
                                    <Field
                                        placeholder="Instagram Link"
                                        type="text"
                                        name="instgram_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="instgram_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        LinkedIn Link
                                    </div>
                                    <Field
                                        placeholder="LinkedIn Link"
                                        type="text"
                                        name="linkedIn_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="linkedIn_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm pb-1">
                                        Facebook Link
                                    </div>
                                    <Field
                                        placeholder="Facebook Link"
                                        type="text"
                                        name="facebook_Link"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-4 py-2 rounded-lg text-sm w-full"
                                    />
                                    <ErrorMessage
                                        name="facebook_Link"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>

                                {isSubmitting ? (
                                    <span className="small-loader my-5 m-auto"></span>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        Edit Profile
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
    fontSize: "12px",
    color: "red",
};

const names_errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    left: "5px",
    fontSize: "12px",
    color: "red",
};

export default Edit_Profile;
