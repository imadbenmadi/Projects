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
        <div className="w-full  bg-white flex flex-col items-center py-12">
            <div className="text-black_text">
                <div className="text-3xl font-semibold">Edit Profile</div>

                <div>
                    <Formik
                        initialValues={{
                            firstName: user?.firstName || "",
                            lastName: user?.lastName || "",
                            email: user?.email || "",
                            profile_pic_link: user?.profile_pic_link || "",
                            studentId: user?.id,
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

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            if (!values.studentId) {
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
                                            `http://localhost:3000/upload/Student/ProfilePic`,
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
                                        `http://localhost:3000/Students/${values.studentId}/Profile`,
                                        values,
                                        {
                                            withCredentials: true,
                                            validateStatus: () => true,
                                        }
                                    );

                                    if (response.status === 200) {
                                        set_user(response.data.user);

                                        window.location.href =
                                            "/Student/Profile";
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
