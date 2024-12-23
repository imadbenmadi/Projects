import React from "react";
import Register_image from "../../../../public/Register.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import handleRegister from "./Post_Register";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
    const [Privacy, setPrivacy] = useState(true);
    const handleChangePrivacy = () => {
        setPrivacy(!Privacy);
    };
    const [userType_value, setuserType_value] = useState("freelancer");
    function handle_change_UserType(value) {
        setuserType_value(value);
    }
    return (
        <div className="flex">
            <div className=" max-w-[350px] lg:max-w-full hidden md:block   h-[calc(100vh)]">
                <img
                    src={Register_image}
                    alt="Login"
                    className=" w-full h-full object-cover "
                />
            </div>
            <div className="w-full h-screen overflow-y-auto py-12 bg-white flex flex-col items-center justify-center ">
                <div className=" w-[80%] text-black_text">
                    <div className=" pb-4 pt-24 md:pt-0 ">
                        <div className=" text-3xl font-semibold ">
                            Create an account
                        </div>
                        <div>Let’s get started your freelance journey.</div>
                    </div>

                    <div>
                        <Formik
                            initialValues={{
                                userType: userType_value,
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }}
                            validate={(values) => {
                                const errors = {};

                                if (!values.firstName) {
                                    errors.firstName = "First Name is Required";
                                } else if (values.firstName.length < 3)
                                    errors.firstName = " At least 3 chars";
                                else if (values.firstName.length > 30)
                                    errors.firstName = " At most 30 chars";
                                if (!values.lastName) {
                                    errors.lastName = "Last Name is Required";
                                } else if (values.lastName.length < 3)
                                    errors.lastName = " At least 3 chars";
                                else if (values.lastName.length > 30)
                                    errors.lastName = " At most 30 chars";
                                if (!values.email) {
                                    errors.email = "email is Required";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email
                                    )
                                ) {
                                    errors.email = "Invalid email address";
                                }

                                // Validate password
                                if (!values.password) {
                                    errors.password = "password is Required";
                                } else if (values.password.length < 8) {
                                    errors.password =
                                        "password must be at least 8 characters long";
                                }

                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                handleRegister(values, { setSubmitting });
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black_text">
                                    <div className="  flex items-center justify-center gap-4 md:gap-8 w-full text-gray_v">
                                        <div
                                            className={` cursor-pointer flex items-center justify-between gap-2  ${
                                                userType_value == "freelancer"
                                                    ? "border-2 border-perpol_v text-perpol_v"
                                                    : "border border-gray_white text-gray-400"
                                            } rounded-lg  text-base py-1 font-semibold px-4`}
                                            onClick={() => {
                                                setFieldValue(
                                                    "userType",
                                                    "freelancer"
                                                ),
                                                    handle_change_UserType(
                                                        "freelancer"
                                                    );
                                            }}
                                        >
                                            <div
                                                className={` w-4 h-4 rounded-full border-2 ${
                                                    userType_value ==
                                                    "freelancer"
                                                        ? "border-perpol_v"
                                                        : "border-gray_white"
                                                } flex items-center justify-center`}
                                            >
                                                {userType_value ==
                                                    "freelancer" && (
                                                    <div className=" w-2 h-2 rounded-full bg-perpol_v"></div>
                                                )}
                                            </div>
                                            <div>Freelancer</div>
                                        </div>
                                        <div
                                            className={` cursor-pointer flex items-center justify-between gap-2  ${
                                                userType_value == "client"
                                                    ? "border-2 border-perpol_v text-perpol_v"
                                                    : "border border-gray_white text-gray-400"
                                            } rounded-lg  text-base py-1 font-semibold px-4`}
                                            onClick={() => {
                                                setFieldValue(
                                                    "userType",
                                                    "client"
                                                ),
                                                    handle_change_UserType(
                                                        "client"
                                                    );
                                            }}
                                        >
                                            <div
                                                className={` w-4 h-4 rounded-full border-2 ${
                                                    userType_value == "client"
                                                        ? "border-perpol_v"
                                                        : "border-gray_white"
                                                } flex items-center justify-center`}
                                            >
                                                {userType_value == "client" && (
                                                    <div className=" w-2 h-2 rounded-full bg-perpol_v"></div>
                                                )}
                                            </div>
                                            <div>Client</div>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full pb-6 ">
                                        <div className="w-full  md:w-[50%]  relative">
                                            <div className="  font-semibold text-sm pb-1">
                                                First Name
                                            </div>
                                            <Field
                                                placeholder="Prénom"
                                                type="text"
                                                name="firstName"
                                                disabled={isSubmitting}
                                                className="w-full border border-gray_white px-4 py-2 rounded-lg  text-sm "
                                            />
                                            <ErrorMessage
                                                name="firstName"
                                                component="div"
                                                style={names_errorInputMessage}
                                            />
                                        </div>
                                        <div className="  w-full  md:w-[50%] relative">
                                            <div className="font-semibold text-sm pb-1">
                                                Last Name
                                            </div>
                                            <Field
                                                placeholder="Nom de famille"
                                                type="text"
                                                name="lastName"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                            />
                                            <ErrorMessage
                                                name="lastName"
                                                component="div"
                                                style={names_errorInputMessage}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className=" font-semibold text-sm pb-1">
                                            email{" "}
                                        </div>
                                        <Field
                                            placeholder="example@gmail.com"
                                            type="email"
                                            name="email"
                                            disabled={isSubmitting}
                                            className="border border-gray_white px-4 py-2 rounded-lg  text-sm  w-full"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>
                                    <div>
                                        <div className=" font-semibold text-sm pb-1">
                                            password{" "}
                                        </div>
                                        <div className=" flex items-center">
                                            <Field
                                                placeholder="•••••••••••••••••••"
                                                type="text"
                                                name="password"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2  rounded-lg text-sm  w-full"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            style={errorInputMessage}
                                        />
                                    </div>

                                    <div className=" flex gap-3 text-sm">
                                        <input
                                            checked={Privacy}
                                            onClick={handleChangePrivacy}
                                            type="checkbox"
                                            className={`w-4 h-4`}
                                        />
                                        <div>
                                            By checking the box below, you
                                            acknowledge that you have read,
                                            understood, and agree to be bound by
                                            these{" "}
                                            <Link
                                                to={"/Privacy?prev=Register"}
                                                className=" font-semibold underline"
                                            >
                                                Terms of Service.
                                            </Link>
                                        </div>
                                    </div>
                                    {isSubmitting ? (
                                        <span className="small-loader my-5  w-full m-auto"></span>
                                    ) : Privacy ? (
                                        <button
                                            type="submit"
                                            className=" bg-perpol_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                            disabled={isSubmitting}
                                        >
                                            Get Started
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className=" bg-gray_white py-2 mt-4 rounded-2xl  text-gray-400 font-semibold "
                                            disabled={true}
                                        >
                                            Get Started
                                        </button>
                                    )}
                                </Form>
                            )}
                        </Formik>
                        <div className="pt-6 text-sm font-semibold text-gray_v text-center">
                            Already have an account?{" "}
                            <Link
                                to={"/Login"}
                                className=" underline text-perpol_v"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
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
export default Register;
