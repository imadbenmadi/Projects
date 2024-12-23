import React from "react";
import Login_image from "../../../../public/Login.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import handleLogin from "./Post_Login";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Logo from "../../../../public/Logo.png";
function Login() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [Login_image];
                let loadedCount = 0;
                if (images.length === 0) resolve();
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve(); // Resolve promise when all images are loaded
                        }
                    };
                    img.onerror = () => {
                        resolve(); // Reject if any image fails to load
                    };
                    img.src = imageSrc;
                });
            });
        };

        const fetch_fonts = () => {
            return new Promise((resolve, reject) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
                const loadFont = (url) => {
                    return new Promise((resolve, reject) => {
                        const link = document.createElement("link");
                        link.href = url;
                        link.rel = "stylesheet";
                        link.onload = () => {
                            resolve(); // Resolve promise when font is loaded
                        };
                        link.onerror = () => {
                            document.getElementById("root").style.fontFamily =
                                "sans-serif";
                            resolve(); // Resolve even if font fails to load
                        };
                        document.head.appendChild(link);
                        document.getElementById("root").style.fontFamily =
                            "Poppins";
                    });
                };

                // Load the font
                loadFont(fontURL)
                    .then(resolve)
                    .catch(() => {
                        document.getElementById("root").style.fontFamily =
                            "sans-serif";
                        resolve();
                    });
            });
        };

        // Promise.all([fetch_fonts(), fetch_images(), fetchData()]);
        Promise.all([fetch_fonts(), fetch_images()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    } else
        return (
            <div className="flex">
                <div className=" max-w-[350px] lg:max-w-full shrink-0 hidden md:block   h-[calc(100vh)]">
                    <img
                        src={Login_image}
                        alt="Login"
                        className=" w-full h-full object-cover "
                    />
                </div>
                <div className="w-full h-screen bg-white flex flex-col items-center justify-center ">
                    <div className=" w-[80%] text-black_text">
                        <div className=" pb-4 ">
                            <div className=" text-3xl font-semibold ">
                                Welcome Back Admin
                            </div>
                            {/* <div>Sign in to get started.</div> */}
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
                                        errors.password =
                                            "password is Required";
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
                                                Email{" "}
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
                                                Password{" "}
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

                                        {isSubmitting ? (
                                            <span className="small-loader my-5  w-full m-auto"></span>
                                        ) : (
                                            <button
                                                type="submit"
                                                className=" bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                                disabled={isSubmitting}
                                            >
                                                Get Started
                                            </button>
                                        )}
                                    </Form>
                                )}
                            </Formik>
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
