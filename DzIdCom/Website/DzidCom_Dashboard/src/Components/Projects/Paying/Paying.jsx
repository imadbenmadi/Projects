import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { SiFreelancer } from "react-icons/si";
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";
function Applications() {
    const Navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD MMMM YYYY");
    };

    useEffect(() => {
        setLoading(true);
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Payment`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    const projectsData = response.data.projects;
                    setProjects(projectsData);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-perpol_b pb-6">
                    Projects Payment
                </div>
                {!projects || projects.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray-600 pt-6">
                        No Payments found
                    </div>
                ) : (
                    <div>
                        <div className="w-full flex gap-12 justify-center py-4">
                            <div className="max-w-[300px] border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                                <div className="text-xs font-semibold pb-5 text-gray_v w-full">
                                    Total Number of Projects:
                                </div>
                                <div className="flex justify-between gap-2 mx-2 w-full">
                                    <div className="font-semibold text-2xl">
                                        {/* {projects.reduce(
                                            (total, project) =>
                                                total +
                                                project.applicationsCount,
                                            0
                                        )} */}
                                        {projects.length}
                                    </div>
                                    <div className="shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                        <MdAttachMoney className="shrink-0 text-2xl" />
                                    </div>
                                </div>
                            </div>{" "}
                        </div>
                        <table className="table-auto w-full mt-4 text-sm">
                            <thead>
                                <tr className="bg-gray-200 font-normal">
                                    <th className="px-4 py-2 border-l border-white rounded-tl-md">
                                        Project Title
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Client Company Name
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Payment Status
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        project Created At
                                    </th>
                                    <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold">
                                {projects.map((project) => (
                                    <tr key={project?.id}>
                                        <td className="border px-4 py-2">
                                            {project?.Title}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.owner?.company_Name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.status === "Payed" ? (
                                                <>
                                                    <div className="">
                                                        <span className="text-green_v">
                                                            Payed :
                                                        </span>{" "}
                                                        Client Payed the Project
                                                        fees
                                                    </div>
                                                </>
                                            ) : !project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId ? (
                                                <>
                                                    <div className="">
                                                        <span className=" text-red-500">
                                                            Client have not yet
                                                            uploaded payment
                                                            screenshot
                                                        </span>
                                                    </div>
                                                </>
                                            ) : project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId &&
                                              !project?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className="text-perpol_v">
                                                        Client uploaded the
                                                        payment screenshot :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        Waiting for Payment
                                                        Validation
                                                    </span>
                                                </div>
                                            ) : project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId &&
                                              project?.isPayment_ScreenShot_Rejected ? (
                                                <>
                                                    <div className="">
                                                        <span className="text-red-500">
                                                            Payment Rejected :
                                                        </span>{" "}
                                                        <span className=" text-gray_v">
                                                            Waiting Client to
                                                            reupload the Payment
                                                            screenshot
                                                        </span>
                                                    </div>
                                                </>
                                            ) : project?.status ===
                                                  "Accepted" &&
                                              !project?.FreelancerId ? (
                                                <div>
                                                    <span className="text-perpol_v">
                                                        Accepted :
                                                    </span>{" "}
                                                    Wainting for freelancers to
                                                    Apply for this project
                                                </div>
                                            ) : null}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {formatDate(project?.createdAt)}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    Navigate(
                                                        `/Projects_Paying/${project?.id}`
                                                    );
                                                }}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

export default Applications;
