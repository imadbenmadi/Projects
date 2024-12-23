import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../../AppContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Client_Projects() {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Projcets, setProjcets] = useState([]);

    useEffect(() => {
        setLoading(true);
        const FetchProjcets = async ({ setProjcets, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Clients/${user?.id}/Projects`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const Projcets = response.data.Projects;
                    setProjcets(Projcets);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Naviagte("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchProjcets({ setProjcets, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div>
                {!Projcets || Projcets?.length == 0 ? (
                    <div className=" flex flex-col items-center justify-center">
                        <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                            <IoIosWarning />
                            <h1>No Projects Found</h1>
                        </div>
                        <Link
                            to={"/Client/Projects/Add"}
                            className=" bg-perpol_v px-3 py-2 rounded-md cursor-pointer text-white font-semibold text-base
                                        flex items-center justify-centerd mt-4 gap-4"
                        >
                            <div>
                                <FaPlus />
                            </div>
                            <div>Add new Project</div>
                        </Link>
                    </div>
                ) : (
                    <div className=" flex flex-col items-center justify-center">
                        <Link
                            to={"/Client/Projects/Add"}
                            className=" bg-perpol_v px-3 py-2 rounded-md cursor-pointer text-white font-semibold text-base
                                        flex items-center justify-centerd mt-4 gap-4 "
                        >
                            <div>
                                <FaPlus />
                            </div>
                            <div>Add new Project</div>
                        </Link>
                        <div className=" w-[90%] mx-auto">
                            {Projcets.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex flex-col items-center justify-center border  rounded-md p-4 my-4"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-sm  mb-6 font-semibold text-white">
                                            <div className=" text-gray_v text-lg">
                                                {project?.Title}
                                            </div>
                                            <div className=" flex gap-2">
                                                {project?.Field_is_Graphic_design && (
                                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                                        Graphic Design
                                                    </div>
                                                )}
                                                {project?.Field_is_Content_creation && (
                                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                                        Content creation
                                                    </div>
                                                )}
                                                {project?.Field_is_SEO_SIM && (
                                                    <div className="bg-perpol_v text-md rounded-lg py-1 mt-2 px-3 ">
                                                        SEO/SMM
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            to={`/Client/Projects/${project.id}`}
                                            className="bg-perpol_v px-3 py-2 rounded-md cursor-pointer text-white font-semibold text-base"
                                        >
                                            View
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div
                                            className={`text-sm  font-semibold text-gray_v `}
                                        >
                                            <div>
                                                {project?.status === "Payed" &&
                                                !project?.isWorkUploaded ? (
                                                    <>
                                                        <div className="">
                                                            <span className="text-green_v">
                                                                Payed :
                                                            </span>{" "}
                                                            Your payment
                                                            accepted. <br />a
                                                            Freelancer is
                                                            working on your
                                                            project
                                                        </div>
                                                    </>
                                                ) : project?.status ===
                                                      "Payed" &&
                                                  project?.isWorkUploaded &&
                                                  !project?.isWorkRejected ? (
                                                    <div className="">
                                                        <span className="text-green_v">
                                                            Uploaded :
                                                        </span>{" "}
                                                        The Freelancer Upload
                                                        the files of your
                                                        project .
                                                        <br />
                                                        please validate the work
                                                    </div>
                                                ) : project?.status ===
                                                      "Payed" &&
                                                  project?.isWorkUploaded &&
                                                  project?.isWorkRejected ? (
                                                    <div className="">
                                                        <span className="text-red-500">
                                                            Rejection Sent to
                                                            the Freelancer :
                                                        </span>{" "}
                                                        please wait till the
                                                        freelancer correct the
                                                        mentioned pointes .
                                                    </div>
                                                ) : project?.status ===
                                                  "Rejected" ? (
                                                    <div className="">
                                                        <span className="text-red-600">
                                                            Rejected :
                                                        </span>{" "}
                                                        <span className=" text-gray_v">
                                                            Your project has
                                                            been rejected.
                                                        </span>
                                                    </div>
                                                ) : project?.status ===
                                                  "Completed" ? (
                                                    <div className="">
                                                        <span className="text-green_v">
                                                            Completed :
                                                        </span>{" "}
                                                        <span className=" text-gray_v">
                                                            Your project has
                                                            been closed.
                                                        </span>
                                                    </div>
                                                ) : !project?.isPayment_ScreenShot_uploaded &&
                                                  project?.status ===
                                                      "Accepted" &&
                                                  project?.FreelancerId ? (
                                                    <div className="">
                                                        <span className="text-gray_v">
                                                            Accepted :
                                                        </span>{" "}
                                                        <span className=" text-red-500">
                                                            You have to pay the
                                                            fees to start the
                                                            project
                                                        </span>
                                                    </div>
                                                ) : project?.isPayment_ScreenShot_uploaded &&
                                                  project?.status ===
                                                      "Accepted" &&
                                                  project?.FreelancerId &&
                                                  !project?.isPayment_ScreenShot_Rejected ? (
                                                    <div className="">
                                                        <span className="text-perpol_v">
                                                            Accepted :
                                                        </span>{" "}
                                                        <span className=" text-gray_v">
                                                            Waiting Dashboard to
                                                            accept the payment
                                                        </span>
                                                    </div>
                                                ) : project?.isPayment_ScreenShot_uploaded &&
                                                  project?.status ===
                                                      "Accepted" &&
                                                  project?.FreelancerId &&
                                                  project?.isPayment_ScreenShot_Rejected ? (
                                                    <div className="">
                                                        <span className="text-red-500">
                                                            Payment Rejected :
                                                        </span>{" "}
                                                        <span className=" text-gray_v">
                                                            Ower Team rejecteed
                                                            Your payment. please
                                                            reupload the Payment
                                                            screenshot , or
                                                            contact ower support
                                                        </span>
                                                    </div>
                                                ) : project?.isPayment_ScreenShot_uploaded &&
                                                  project?.status ===
                                                      "Accepted" &&
                                                  project?.FreelancerId &&
                                                  project?.isPayment_ScreenShot_Rejected ? (
                                                    <div className="">
                                                        <span className=" text-red-500">
                                                            your payment has
                                                            been rejected :{" "}
                                                        </span>
                                                        <span className="text-gray_v">
                                                            Please verify your
                                                            payment details and
                                                            try again. If the
                                                            issue persists,
                                                            contact our support
                                                            team for assistance.
                                                        </span>{" "}
                                                    </div>
                                                ) : project?.status ===
                                                      "Accepted" &&
                                                  !project?.FreelancerId ? (
                                                    <div>
                                                        <span className="text-perpol_v">
                                                            Accepted
                                                        </span>{" "}
                                                        Searching For the
                                                        Freelancer
                                                    </div>
                                                ) : project?.status ===
                                                  "Pending" ? (
                                                    <div>
                                                        <span className="text-perpol_v">
                                                            Pending
                                                        </span>{" "}
                                                        <span className=" text-gray_v">
                                                            Ower team is
                                                            reviewing your
                                                            project
                                                        </span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    {project?.Frelancer_Experiance && (
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-sm pt-2 text-gray_v">
                                                frelancer experiance :{" "}
                                                <span className=" font-semibold">
                                                    {
                                                        project?.Frelancer_Experiance
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    {project?.Client_Budget && (
                                        <div className="flex items-center justify-between w-full text-sm font-semibold">
                                            <div className="text-sm pt-4 text-gray_v flex gap-2 items-center">
                                                Budget: {project?.Client_Budget}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between w-full font-semibold">
                                        <div className="text-sm pt-1 text-gray_v">
                                            Created at :{" "}
                                            {/* {new Date(
                                                project?.createdAt
                                            ).toLocaleDateString()} */}
                                            {dayjs(project?.createdAt).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
}

export default Client_Projects;
