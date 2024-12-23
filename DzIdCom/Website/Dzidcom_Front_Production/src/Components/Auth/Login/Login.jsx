import React from "react";
import Login_image from "../../../../public/Login.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import handleLogin from "./Post_Login";
import { Link } from "react-router-dom";
import { useState } from "react";
function Login() {
    const [Privacy, setPrivacy] = useState(true);
    const handleChangePrivacy = () => {
        setPrivacy(!Privacy);
    };
    return (
        <div className="flex">
            <div className=" max-w-[350px] lg:max-w-full hidden md:block   h-[calc(100vh)]">
                <img
                    src={Login_image}
                    alt="Login"
                    className=" w-full h-full object-cover "
                />
            </div>
            <div className="w-full h-screen bg-white flex flex-col items-center justify-center ">
                <div className=" w-[80%] text-black_text">
                    <div className=" pb-4 ">
                        <div className=" text-3xl font-semibold ">Log in</div>
                        <div>Sign in to get started.</div>
                    </div>

                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validate={(values) => {
                                const errors = {};

                                // Validate email
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
                                handleLogin(values, { setSubmitting });
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black_text">
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
                                                to={"/Privacy?prev=Login"}
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

                        <div className="pt-6 text-sm font-semibold text-gray_v text-center ">
                            Don’t have an account?{" "}
                            <Link
                                to={"/Register"}
                                className=" underline text-perpol_v"
                            >
                                Sign up
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
export default Login;
