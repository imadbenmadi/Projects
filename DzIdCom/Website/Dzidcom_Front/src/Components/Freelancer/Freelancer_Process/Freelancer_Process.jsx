import React from "react";
import Alert_Complete_Profile from "../Alerts/Alert_Complete_Profile";
import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Freelancer_Process() {
    const Naviagte = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Projcets, setProjcets] = useState([]);
    const { show_Alert_completeProfile } = useAppContext();
    useEffect(() => {
        setLoading(true);
        const FetchProjcets = async ({ setProjcets, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Freelancers/${user?.id}/Process`,
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
                {show_Alert_completeProfile && <Alert_Complete_Profile />}
                <div>
                    {!Projcets || Projcets?.length == 0 ? (
                        <div className=" flex flex-col items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>No Projects Found</h1>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center">
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
                                                to={`/Freelancer/Process/${project.id}`}
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
                                                    {project?.status ===
                                                        "Payed" &&
                                                    !project?.isWorkUploaded ? (
                                                        //  &&!project?.isWorkRejected
                                                        <>
                                                            <div className="">
                                                                <span className="text-green_v">
                                                                    Client is
                                                                    waiting for
                                                                    your work :
                                                                </span>{" "}
                                                                please upload
                                                                the files as
                                                                soon as you
                                                                finished working
                                                                on the project
                                                            </div>
                                                        </>
                                                    ) : project?.status ===
                                                          "Payed" &&
                                                      project?.isWorkRejected &&
                                                      project?.isWorkUploaded ? (
                                                        <div>
                                                            <div className="">
                                                                <span className="text-red-500">
                                                                    Client
                                                                    Rejected
                                                                    Your work :
                                                                </span>{" "}
                                                                please check the
                                                                rejections
                                                                history to view
                                                                the reason
                                                            </div>
                                                        </div>
                                                    ) : project?.status ===
                                                          "Payed" &&
                                                      !project?.isWorkRejected &&
                                                      project?.isWorkUploaded ? (
                                                        <div>
                                                            <div className="">
                                                                <span className="text-gray_v">
                                                                    Waiting the
                                                                    Client to
                                                                    review your
                                                                    work
                                                                </span>{" "}
                                                            </div>
                                                        </div>
                                                    ) : project?.status ===
                                                      "Completed" ? (
                                                        <div className="">
                                                            <span className="text-green_v">
                                                                Completed :
                                                            </span>{" "}
                                                            <span className=" text-gray_v">
                                                                the project has
                                                                been closed.
                                                            </span>
                                                        </div>
                                                    ) : project?.status ===
                                                      "Accepted" ? (
                                                        <div className="">
                                                            <span className="text-green_v">
                                                                Accepted :
                                                            </span>{" "}
                                                            <span className=" text-gray_v">
                                                                Waiting for the
                                                                Client Payment
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
                                        <div className="flex items-center justify-between w-full py-2 font-semibold">
                                            <div className="text-sm pt-1 text-gray_v">
                                                Deadline : {project?.DeadLine}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between w-full font-semibold">
                                            <div className="text-sm pt-1 text-gray_v">
                                                Created at :{" "}
                                                {/* {new Date(
                                                    project?.createdAt
                                                ).toLocaleDateString()} */}
                                                {dayjs(
                                                    project?.createdAt
                                                ).format("DD MMMM YYYY")}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Freelancer_Process;
