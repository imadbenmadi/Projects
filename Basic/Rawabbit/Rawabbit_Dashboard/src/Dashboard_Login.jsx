import Logo from "../public/Logo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Axios from "axios";
import Swal from "sweetalert2";

import { useAppContext } from "./Context/AppContext";
function Dashboard_Login() {
    const { store_login } = useAppContext();

    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }
    async function handle_Admin_Login(values, { setSubmitting }) {
        try {
            let response = await Axios.post(
                "http://localhost:3000/Dashboard/Login",
                values,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            console.log(response);
            if (response.status == 200) {
                Swal.fire("Done!", "Logged in Successfully", "success");
                Navigate("/");
            } else if (response.status == 401) {
                Swal.fire(
                    "Unauthorized!",
                    `wrong name or password , ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 409) {
                Swal.fire(
                    "Error!",
                    `Missing Data ,  ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 500) {
                Swal.fire(
                    "Error!",
                    `Internal Server Error ,  ${response.data.message}`,
                    "error"
                );
            } else if (response.status == 429) {
                Swal.fire(
                    "Error!",
                    `Too many requests ,try again latter\n  ${response.data.message}`,
                    "error"
                );
            } else {
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            console.log(error);
            Swal.fire(
                "Error!",
                `Something Went Wrong ,${error.message}`,
                "error"
            );
        }

        setSubmitting(false);
    }

    return (
        <div>
            <Link to={"/"} className="select-none flex m-auto w-fit">
                <img className=" w-20 m-auto pt-5 " src={Logo} alt="" />
            </Link>
            <div className=" m-auto text-center pt-5 text-2xl font-semibold text-blue ">
                Welcome Back Admin
            </div>
            {/* input fields */}
            <div className=" border border-gray_white text-black_text shadow-md w-[80%] md:w-[50%] m-auto mt-3 p-5 rounded-lg  ">
                <div className=" text-lg font-semibold mb-4 ">Login</div>

                <Formik
                    initialValues={{
                        Name: "",
                        Password: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        // Validate Email
                        if (!values.Name) {
                            errors.Name = "Name is Required";
                        }
                        // Validate Password
                        if (!values.Password) {
                            errors.Password = "Password is Required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handle_Admin_Login(values, { setSubmitting });
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="  flex flex-col text-sm md:text-lg md:mx-5 gap-4">
                            <div>
                                <div>
                                    Name{" "}
                                    <span className=" text-red-600 font-semibold">
                                        *
                                    </span>
                                </div>
                                <Field
                                    type="text"
                                    name="Name"
                                    disabled={isSubmitting}
                                    className="border border-gray_white px-2 py-1 rounded  shadow-sm w-full"
                                />
                                <ErrorMessage
                                    name="Name"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>
                            <div>
                                <div>
                                    Password{" "}
                                    <span className=" text-red-600 font-semibold">
                                        *
                                    </span>
                                </div>
                                <div className=" flex items-center">
                                    <Field
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="Password"
                                        disabled={isSubmitting}
                                        className="border border-gray_white px-2 py-1  rounded-s  shadow-sm w-full"
                                    />

                                    <div className=" px-2 py-1 rounded-e cursor-pointer border border-gray_white shadow-sm ">
                                        {showPassword ? (
                                            <IoMdEyeOff
                                                className="text-gray text-xl md:text-2xl"
                                                onClick={handleShowPassword}
                                            />
                                        ) : (
                                            <IoMdEye
                                                className=" text-gray text-xl md:text-2xl"
                                                onClick={handleShowPassword}
                                            />
                                        )}
                                    </div>
                                </div>

                                <ErrorMessage
                                    name="Password"
                                    component="div"
                                    style={errorInputMessage}
                                />
                            </div>

                            <button
                                type="submit"
                                className={` ${
                                    isSubmitting
                                        ? "bg-gray_white text-gray"
                                        : " bg-blue text-white"
                                } w-fit m-auto px-4 py-2 rounded font-semibold `}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <div>loading</div> : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};
export default Dashboard_Login;
