import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { FaRegHandshake } from "react-icons/fa6";

function Requests() {
    const navigate = useNavigate();
    const [Projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [projectTypeFilter, setprojectTypeFilter] = useState("");
    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD  MMMM  YYYY");
    };
    useEffect(() => {
        setLoading(true);
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Projects/requests`,
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
                    Dzidcom Projects Requests
                </div>
                {Projects.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray-600 pt-6">
                        No Projects found
                    </div>
                ) : (
                    <div>
                        <div className=" w-full flex justify-center py-4">
                            <div className="max-w-[300px] border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                                <div className=" text-xs font-semibold pb-5 text-gray_v w-full">
                                    Total Number of Requests:
                                </div>
                                <div className=" flex justify-between gap-2 mx-2 w-full">
                                    <div className="  font-semibold text-2xl">
                                        {Projects.length}
                                    </div>
                                    <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                        <FaRegHandshake className=" shrink-0 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table-auto w-full mt-4 text-sm ">
                            <thead>
                                <tr className="bg-gray-200 font-normal">
                                    <th className="px-4 py-2 rounded-tl-md">
                                        Client Name
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Company Name
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Client Email
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Client Telephone
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Project Title
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
                                {Projects.map((project) => (
                                    <tr key={project.id}>
                                        <td className="border px-4 py-2">
                                            {`${project?.owner?.firstName} ${project?.owner?.lastName}`}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.owner?.company_Name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.owner?.email}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.owner?.telephone}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {project?.Title}
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
                                                        `/Projects_Requests/${project.id}`
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

export default Requests;
