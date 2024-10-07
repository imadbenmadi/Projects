import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function EmailVerification({
    user,
    change_user,
    Toogle_EmailVerification_Done,
}) {
    const [Email, SetEmail] = useState("");
    const [Error, setError] = useState("");
    const change_Email = (e) => {
        SetEmail(e.target.value);
    };
    const validate_Email = (email) => {
        if (email.length == 0) return false;
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const [verify_clicked, setVerify_clicked] = useState(false);
    const Check_Email = async () => {
        setVerify_clicked(true);
        if (!validate_Email(Email)) {
            setError("Invalid Email");
            setVerify_clicked(false);
            return;
        }
        change_user("Email", Email);
        // setError("");
        // Toogle_EmailVerification_Done();
        try {
            const response = await axios.post(
                "https://api.reayahmed.com/auth/check_email/",
                { email: Email },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            console.log("response from check email : ", response.data);
            if (response.status == 200) {
                change_user("Email", Email);
                setError("");
                Toogle_EmailVerification_Done();
            } else {
                setError(response.data);
                Swal.fire({
                    icon: "error",
                    title: "email Already Exists",
                    text: "\ntry to use another Email ",
                });
                //   .then((result) => {
                //     if (result.isConfirmed) {
                //         window.location.href = "/Login";
                //     }
                // });
            }
        } catch (error) {
            setError(error);
            Swal.fire({
                icon: "error",
                title: "error while checking the email",
                //  text: response ,
            });
        } finally {
            setVerify_clicked(false);
        }
    };
    return (
        <div className=" flex flex-col md:flex-row justify-center  items-center gap-6 pt-6 md:min-h-[60vh]">
            <div className=" w-[300px] text-2xl font-semibold ">
                <div className=" text-green text-center md:text-start ">
                    Welcome
                </div>
                <div className=" text-perpol">
                    Before we begin We need to check if you have an account
                </div>
            </div>
            <div className=" flex flex-col ">
                <div>
                    <div className=" pb-1 pl-2 text-lg font-semibold text-gray">
                        Email Adress
                    </div>
                    <input
                        onChange={change_Email}
                        className="  text-md text-black_text border-2 border-perpol bg-perpol bg-opacity-15 rounded-lg p-2 w-[300px]"
                        type="email"
                    />
                    {Error == "Invalid Email" && (
                        <div className="text-red-500 ml-4 text-sm font-semibold">
                            {Error}
                        </div>
                    )}

                    <div className=" text-sm text-gray font-semibold text-center pt-4">
                        Already have an account?{" "}
                        <Link
                            className="text-green font-semibold "
                            to={"/Login"}
                        >
                            Log In
                        </Link>
                    </div>
                    <div className=" mt-6  text-white font-semibold text-center   m-auto w-fit cursor-pointer">
                        {verify_clicked ? (
                            <span className="small-loader mt-4  w-full m-auto"></span>
                        ) : (
                            <div
                                className=" py-2 px-4 bg-perpol rounded-lg  "
                                onClick={Check_Email}
                            >
                                Check Email
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailVerification;
