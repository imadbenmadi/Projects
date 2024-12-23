import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { FaRegHandshake } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

function All_Projects() {
    const navigate = useNavigate();
    const [Projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD  MMMM  YYYY");
    };
    useEffect(() => {
        setLoading(true);
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Projects`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setProjects(response.data.Projects);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
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

    const [searchQuery, setSearchQuery] = useState("");
    const [ProjectsTypeFilter, setProjectsTypeFilter] = useState("");
    const filteredProjectss = Projects.filter((projects) => {
        const title = `${projects.Title}`.toLowerCase();
        return title.includes(searchQuery.toLowerCase());
    }).filter((projects) => {
        if (ProjectsTypeFilter) {
            return projects.status === ProjectsTypeFilter;
        }
        return true;
    });

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
                <div className="text-xl font-semibold  text-perpol_b pb-6">
                    Dzidcom Projects
                </div>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-end md:mr-6 md:gap-6 text-gray-600">
                    <div className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                        <IoSearch className="w-fit shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <select
                        value={ProjectsTypeFilter}
                        onChange={(e) => setProjectsTypeFilter(e.target.value)}
                        className="border p-2 w-fit mx-auto md:mx-0 rounded-md text-sm font-semibold"
                    >
                        <option value="">All</option>
                        <option value="Payed">Payed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                {filteredProjectss.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray-600 pt-6">
                        No Projects found
                    </div>
                ) : (
                    <div>
                        <table className="table-auto w-full mt-4 text-sm ">
                            <thead>
                                <tr className="bg-gray-200 font-normal">
                                    <th className="px-4 py-2 rounded-tl-md">
                                        Project Title
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Status{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        DeadLine{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Fees{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Status Description{" "}
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Created At
                                    </th>
                                    <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold ">
                                {filteredProjectss.map((project) => (
                                    <tr key={project.id}>
                                        <td className="border px-4 py-2">
                                            {`${project?.Title}`}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.status}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.DeadLine ? (
                                                project?.DeadLine
                                            ) : (
                                                <div className="text-red-600">
                                                    No Deadline
                                                </div>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.Money ? (
                                                project?.Money
                                            ) : (
                                                <div className="text-red-600">
                                                    Not set
                                                </div>
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.status === "Payed" &&
                                            !project?.isWorkUploaded ? (
                                                <>
                                                    <div className="">
                                                        <span className="text-green_v">
                                                            Payed :
                                                        </span>{" "}
                                                        payment accepted. <br />
                                                        a Freelancer is working
                                                        on the project
                                                    </div>
                                                </>
                                            ) : project?.status === "Payed" &&
                                              project?.isWorkUploaded &&
                                              !project?.isWorkRejected ? (
                                                <div className="">
                                                    <span className="text-green_v">
                                                        Uploaded :
                                                    </span>{" "}
                                                    The Freelancer Upload the
                                                    files of the project .
                                                </div>
                                            ) : project?.status === "Payed" &&
                                              project?.isWorkUploaded &&
                                              project?.isWorkRejected ? (
                                                <div className="">
                                                    <span className="text-red-500">
                                                        Rejection Sent to the
                                                        Freelancer :
                                                    </span>{" "}
                                                    freelancer is correcting the
                                                    mentioned pointes .
                                                </div>
                                            ) : project?.status ===
                                              "Rejected" ? (
                                                <div className="">
                                                    <span className="text-red-600">
                                                        Rejected :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        the project has been
                                                        rejected.
                                                    </span>
                                                </div>
                                            ) : project?.status ===
                                              "Completed" ? (
                                                <div className="">
                                                    <span className="text-green_v">
                                                        Completed :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        the project has been
                                                        closed.
                                                    </span>
                                                </div>
                                            ) : !project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId ? (
                                                <div className="">
                                                    <span className="text-gray_v">
                                                        Accepted :
                                                    </span>{" "}
                                                    <span className=" text-red-500">
                                                        waiting client to pay
                                                        the project fees
                                                    </span>
                                                </div>
                                            ) : project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId &&
                                              !project?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className="text-perpol_v">
                                                        Accepted :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        Waiting for payment
                                                        Validation
                                                    </span>
                                                </div>
                                            ) : project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId &&
                                              project?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className="text-red-500">
                                                        Payment Rejected :
                                                    </span>{" "}
                                                    <span className=" text-gray_v">
                                                        Payment Rejected ,
                                                        waiting for the Client
                                                        to reupload the payment
                                                        screenshot
                                                    </span>
                                                </div>
                                            ) : project?.isPayment_ScreenShot_uploaded &&
                                              project?.status === "Accepted" &&
                                              project?.FreelancerId &&
                                              project?.isPayment_ScreenShot_Rejected ? (
                                                <div className="">
                                                    <span className=" text-red-500">
                                                        the payment has been
                                                        rejected :{" "}
                                                    </span>
                                                    <span className="text-gray_v">
                                                        Payment Rejected ,
                                                        waiting for the Client
                                                        to reupload the payment
                                                        screenshot{" "}
                                                    </span>{" "}
                                                </div>
                                            ) : project?.status ===
                                                  "Accepted" &&
                                              !project?.FreelancerId ? (
                                                <div>
                                                    <span className="text-perpol_v">
                                                        Accepted
                                                    </span>{" "}
                                                    Searching For the Freelancer
                                                </div>
                                            ) : project?.status ===
                                              "Pending" ? (
                                                <div>
                                                    <span className="text-perpol_v">
                                                        Pending
                                                    </span>{" "}
                                                    <span className="">
                                                        waiting for validation
                                                    </span>
                                                </div>
                                            ) : null}
                                            {/* {project?.status} */}
                                        </td>

                                        <td className="border px-4 py-2">
                                            {/* {new Date(
                                            project.createdAt
                                        ).toLocaleDateString()} */}
                                            {formatDate(project?.createdAt)}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    navigate(
                                                        `/All_Projects/${project.id}`
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

export default All_Projects;
