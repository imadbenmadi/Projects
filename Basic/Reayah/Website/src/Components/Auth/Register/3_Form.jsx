import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import handleRegister from "./Post_Register";
import Swal from "sweetalert2";
import Axios from "axios";
import { Link } from "react-router-dom";
import Facbook_icon from "../../../../public/icons/facebook.png";
import Google_icon from "../../../../public/icons/google.png";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

async function handleRegister(
    values,
    user,
    Toogle_Form_Done,
    { setSubmitting }
) {
    try {
        let response = null;
        if (user.Type == "Patient") {
            response = await Axios.post(
                "https://api.reayahmed.com/auth/sign_up/patient/",
                {
                    first_name: values.FirstName,
                    last_name: values.LastName,
                    email: values.Email,
                    password: values.Password,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
        } else if (user.Type == "Doctor") {
            response = await Axios.post(
                "https://api.reayahmed.com/auth/sign_up/doctor/",
                {
                    first_name: values.FirstName,
                    last_name: values.LastName,
                    email: values.Email,
                    password: values.Password,
                },
                {
                    withCredentials: true,
                    // validateStatus: () => true,
                }
            );
        }
        console.log("response from server : ", response);
        Toogle_Form_Done();
    } catch (error) {
        console.log("response from server : ", error);
        Swal.fire("Error!", `Something Went Wrong .`, "error");
    }
    setSubmitting(false);
}

function Form_component({ user, change_user, Toogle_Form_Done }) {
    const [showPassword, setShowPassword] = useState(false);
    const toogleShowPwd = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className=" flex flex-col md:flex-row justify-center  items-center md:items-start md:gap-6">
            <div className=" w-[250px] lg:w-[300px] text-2xl font-semibold py-6  md:py-28 text-center md:text-start">
                <div className=" text-green text-center md:text-start ">
                    Hi {user.Type == "Patient" ? "Patient" : "Doctor"}
                </div>
                <div className=" text-perpol">
                    Expand your reach. Connect with <br />
                    new patients.{" "}
                </div>
            </div>
            <div className=" w-fit flex flex-col items-center justify-center pb-6 md:pb-0">
                <div className="text-gray md:pt-6 pb-6 md:pb-16 text-3xl font-semibold">
                    Signup
                </div>
                <Formik
                    initialValues={{
                        FirstName: "",
                        LastName: "",
                        Email: user.Email,
                        Password: "",
                        Confirm_Password: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.FirstName) {
                            errors.FirstName = "First Name is Required";
                        }
                        if (!values.LastName)
                            errors.LastName = "Last Name is Required";
                        if (!values.Password) {
                            errors.Password = "Password is Required";
                        } else if (values.Password.length < 8) {
                            errors.Password =
                                "Password must be at least 8 characters long";
                        }
                        if (!values.Confirm_Password)
                            errors.Confirm_Password =
                                "Please Confirm your Password";
                        if (values.Password != values.Confirm_Password)
                            errors.Confirm_Password =
                                "Passwords Does not match";
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleRegister(values, user, Toogle_Form_Done, {
                            setSubmitting,
                        });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className=" px-6 md:px-0 flex flex-col text-sm md:text-base  gap-10 text-black_text">
                            <div className=" flex items-center justify-center gap-4 w-full ">
                                <div className=" w-[50%] relative">
                                    <div className="  font-semibold  pb-1">
                                        First Name
                                    </div>
                                    <Field
                                        // placeholder="Prénom"
                                        type="text"
                                        name="FirstName"
                                        disabled={isSubmitting}
                                        className="border-2 border-perpol bg-perpol bg-opacity-25  px-4 py-2 rounded-lg    w-full  "
                                    />
                                    <ErrorMessage
                                        name="FirstName"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                                <div className="  w-[50%] relative">
                                    <div className="font-semibold  pb-1">
                                        Last Name
                                    </div>
                                    <Field
                                        // placeholder="Nom de famille"
                                        type="text"
                                        name="LastName"
                                        disabled={isSubmitting}
                                        className="border-2 border-perpol bg-perpol bg-opacity-25  px-4 py-2 rounded-lg    w-full"
                                    />
                                    <ErrorMessage
                                        name="LastName"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                            </div>

                            <div className=" relative">
                                <div className=" font-semibold  pb-1">
                                    enter your password{" "}
                                </div>
                                <div className="px-2 gap-2 py-2 flex items-center bg-perpol bg-opacity-25 border-2 rounded-lg border-perpol ">
                                    <Field
                                        // placeholder="•••••••••••••••••••"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="Password"
                                        disabled={isSubmitting}
                                        className="    bg-transparent    w-full"
                                    />
                                    {showPassword ? (
                                        <FaRegEyeSlash
                                            className=" text-xl  shrink-0 w-fit cursor-pointer"
                                            onClick={toogleShowPwd}
                                        />
                                    ) : (
                                        <FaRegEye
                                            className=" text-xl  shrink-0 w-fit cursor-pointer"
                                            onClick={toogleShowPwd}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="Password"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                            </div>

                            <div className=" relative">
                                <div className=" font-semibold  pb-1">
                                    Re-enter your password{" "}
                                </div>

                                <div className="px-2 gap-2 py-2 flex items-center bg-perpol bg-opacity-25 border-2 rounded-lg border-perpol ">
                                    <Field
                                        // placeholder="•••••••••••••••••••"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="Confirm_Password"
                                        disabled={isSubmitting}
                                        className="    bg-transparent    w-full"
                                    />
                                    {showPassword ? (
                                        <FaRegEyeSlash
                                            className=" text-xl  shrink-0 w-fit cursor-pointer"
                                            onClick={toogleShowPwd}
                                        />
                                    ) : (
                                        <FaRegEye
                                            className=" text-xl  shrink-0 w-fit cursor-pointer"
                                            onClick={toogleShowPwd}
                                        />
                                    )}
                                    <ErrorMessage
                                        name="Confirm_Password"
                                        component="div"
                                        style={errorInputMessage}
                                    />
                                </div>
                            </div>

                            {isSubmitting ? (
                                <span className="small-loader mt-4 mb-2  w-full m-auto"></span>
                            ) : (
                                <button
                                    type="submit"
                                    className=" bg-perpol w-fit m-auto px-4 py-2  rounded-2xl text-white font-semibold "
                                    disabled={isSubmitting}
                                >
                                    Get Started
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
                <div className=" font-semibold text-gray py-3">
                    Already have an account? {" "}
                    <Link to={"/Login"} className=" text-green">
                        Log In
                    </Link>
                </div>
                <div className=" pt-3 flex flex-col items-center justify-center ">
                    <div className=" pb-6">OR</div>
                    <div className=" cursor-not-allowed w-[300px] mb-4 px-2 py-1 rounded-lg border border-gray text-gray flex items-center justify-center gap-6 ">
                        <img
                            src={Google_icon}
                            alt=""
                            className="  object-cover w-6"
                        />
                        Continue with Google
                    </div>
                    <div className="cursor-not-allowed w-[300px] px-2 py-1 border  rounded-lg bg-[#0047FF]  text-white flex items-center justify-center gap-2 ">
                        <img
                            src={Facbook_icon}
                            alt=""
                            className="  object-cover w-6"
                        />
                        Continue with Facebook{" "}
                    </div>
                </div>
                <div className=" text-sm py-8 px-6">
                    By creating account you agree to our{" "}
                    <span className=" text-perpol">Terms of Service</span> and{" "}
                    <span className=" text-perpol">Privacy Policy.</span>
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
export default Form_component;
