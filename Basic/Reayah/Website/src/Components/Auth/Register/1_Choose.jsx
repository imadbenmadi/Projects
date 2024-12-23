import React from "react";
import ImageLoader from "../..//ImageLoader";
import Doctore from "../../../../public/Register/Doctore.png";
import Patient from "../../../../public/Register/Patient.png";
import { Link } from "react-router-dom";
function Choose({ user, change_user, Toogle_userType_Done }) {
    return (
        <div className=" pt-12">
            <div className=" text-3xl font-semibold text-perpol text-center ">
                <div className=" relative w-fit m-auto">
                    SignUp
                    <span className=" absolute  left-0 -z-10 bottom-[2px] w-full h-2 rounded-xl bg-green "></span>
                </div>
            </div>
            <div className=" font-semibold text-gray text-2xl text-center pt-6 ">
                as a patient or doctor
            </div>
            {/* Cards */}
            <div className=" flex flex-col  md:flex-row items-center justify-center gap-8 pt-6">
                <div
                    className={` bg-perpol bg-opacity-20 text-perpol text-2xl  font-semibold ${
                        user.Type == "Patient" && "border-4 border-perpol"
                    } p-4 w-[300px] md:w-[360px] h-[200px] md:h-[245px] flex flex-col  justify-between rounded-xl  cursor-pointer `}
                    onClick={() => change_user("Type", "Patient")}
                >
                    <div>I’m a patient , need a treatments </div>
                    <div className=" flex justify-between items-end">
                        <div className=" w-6 h-6 rounded-full border-2 border-perpol  flex items-center  justify-center relative   ">
                            {user.Type === "Patient" && (
                                <div className="w-4 h-4 rounded-full bg-perpol m-auto absolute"></div>
                            )}
                        </div>
                        <div className="relative w-20 h-20 ">
                            <ImageLoader src={Patient} />
                        </div>
                    </div>
                </div>

                <div
                    className={` bg-green bg-opacity-10 text-green text-2xl font-semibold ${
                        user.Type == "Doctor" && "border-4 border-green"
                    }  p-4 w-[300px]  md:w-[360px] h-[200px] md:h-[245px] flex flex-col  justify-between rounded-xl  cursor-pointer `}
                    onClick={() => change_user("Type", "Doctor")}
                >
                    <div>I’m a doctor</div>
                    <div className=" flex justify-between items-end">
                        <div className=" w-6 h-6 rounded-full border-2 border-green flex items-center  justify-center relative">
                            {user.Type === "Doctor" && (
                                <div className="w-4 h-4 rounded-full bg-green m-auto absolute"></div>
                            )}
                        </div>

                        <div className="relative w-20 h-20 ">
                            <ImageLoader src={Doctore} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className=" bg-perpol text-white font-semibold text-xl p-3 cursor-pointer rounded-xl w-fit m-auto mt-6 text-center"
                onClick={Toogle_userType_Done}
            >
                Create Account
            </div>
            <div className=" text-xl text-gray font-semibold text-center py-6">
                Already have an account?{" "}
                <Link className="text-green " to={"/Login"}>
                    Log In
                </Link>
            </div>
        </div>
    );
}

export default Choose;
