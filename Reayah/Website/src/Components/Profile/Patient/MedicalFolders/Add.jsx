import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Add() {
    const patientId = window.localStorage.getItem("patientId");
    return (
        <div className=" relative">
            <Link
                to={`/Patients/${patientId}/Medical_Folders`}
                className=" absolute top-6 left-6 w-12 h-12 rounded-full bg-perpol  text-white flex items-center justify-center"
            >
                <FaArrowLeft className=" text-3xl  shrink-0" />
            </Link>
        </div>
    );
}

export default Add;
