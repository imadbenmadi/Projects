import React from "react";
import { IoIosWarning } from "react-icons/io";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const JobsList = ({ jobs, loading }) => {
    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                    <IoIosWarning />
                    <h1>No Jobs Found</h1>
                </div>
            </div>
        );
    }

    return (
        <>
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="flex flex-col items-center justify-center border rounded-md p-4 my-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="text-sm mb-6 font-semibold text-white">
                            <div className="text-gray_v text-lg">
                                {job?.Title}
                            </div>
                            <div className="flex gap-2">
                                {job?.Field_is_Graphic_design && (
                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3">
                                        Graphic Design
                                    </div>
                                )}
                                {job?.Field_is_Content_creation && (
                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3">
                                        Content creation
                                    </div>
                                )}
                                {job?.Field_is_SEO_SIM && (
                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3">
                                        SEO/SMM
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link
                            to={`/Freelancer/Jobs/${job.id}`}
                            className="bg-perpol_v px-3 py-2 rounded-md cursor-pointer text-white font-semibold text-base"
                        >
                            View
                        </Link>
                    </div>
                    {job?.Frelancer_Experiance && (
                        <div className="flex items-center justify-between w-full">
                            <div className="text-sm pt-2 text-gray_v">
                                Freelancer experience:{" "}
                                <span className="font-semibold">
                                    {job?.Frelancer_Experiance}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center justify-between w-full font-semibold">
                        <div className="text-sm pt-1 text-gray_v">
                            Created at:{" "}
                            {/* {new Date(job?.createdAt).toLocaleDateString()} */}
                            {dayjs(job?.createdAt).format("DD MMMM YYYY")}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default JobsList;
