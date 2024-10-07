import React from "react";
import Done_image from "../../../../public/Done.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function Done() {
    return (
        <div className=" flex flex-col gap-6  items-center justify-center">
            <div className=" flex flex-col md:flex-row items-center justify-center gap-6  md:gap-24 w-screen h-[60vh]">
                <div className=" w-[300px] text-perpol text-3xl font-semibold">
                    Ready to take charge of your health?
                    <br /> Let's get going!
                </div>
                <div>
                    <img src={Done_image} className=" w-[150px]" alt="" />
                </div>
            </div>
            <Link
                to={"/Login"}
                className=" flex items-end justify-center gap-2 text-gray font-semibold  "
            >
                <div className=" text-2xl underline">Go to Login page</div>
                <FaArrowRight />
            </Link>
        </div>
    );
}

export default Done;
