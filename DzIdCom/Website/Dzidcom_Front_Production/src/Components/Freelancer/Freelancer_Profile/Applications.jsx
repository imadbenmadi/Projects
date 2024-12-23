import React from "react";
import { useAppContext } from "../../../AppContext";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
function Applications() {
    const Navigate = useNavigate();
    const { user } = useAppContext();
    return (
        <div className=" hidden md:block  pt-16">
            <div className=" text-2xl text-gray_v font-semibold text-center">
                Applications
            </div>
            {!user?.Applications || user?.Applications?.lengh === 0 ? (
                <div className=" w-fit mx-auto ">
                    <div className=" flex items-center justify-center gap-2 text-gray_v pt-12 text-md font-semibold">
                        <IoWarningOutline /> You have no Applications
                    </div>
                    <div
                        className=" text-white font-semibold bg-perpol_v py-2 px-4  cursor-pointer text-center text-xl mt-6
                        rounded-md cursor-pointe"
                        onClick={() => {
                            // window.location.href = "/Freelancer/Jobs";
                            Navigate("/Freelancer/Jobs");
                        }}
                    >
                        See work offers
                    </div>
                </div>
            ) : null}
            {user?.Applications?.map((Applications) => {
                return (
                    <div
                        key={Applications.id}
                        className=" flex flex-col md:flex-row items-center justify-around gap-4 md:gap-8  mt-8"
                    >
                        <div className=" flex flex-col items-center justify-center gap-4">
                            <div className=" text-xl font-semibold text-gray_v">
                                {Applications?.ProjectTitle}
                            </div>
                            <div className=" text-lg text-gray_v">
                                {Applications?.status}
                            </div>
                        </div>
                        <div className=" text-white font-semibold bg-perpol_v py-2 px-4  text-xl rounded-md cursor-pointer">
                            See offer
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Applications;
