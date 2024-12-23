import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";

function Rejected_Payments() {
    const Navigate = useNavigate();
    const [data, setData] = useState([]); // Combined data for both courses and summaries
    const [filteredData, setFilteredData] = useState([]); // Filtered data based on selected type
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState("all"); // State for the filter (all, course, summary)

    const formatDate = (dateString) => {
        return dayjs(dateString).format("DD MMMM YYYY");
    };

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                // Fetch both requests simultaneously
                let coursesResponse = await axios.get(
                    `http://localhost:3000/Admin/Payment/Courses/Rejected`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                let summariesResponse = await axios.get(
                    `http://localhost:3000/Admin/Payment/Summaries/Rejected`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                // Process courses payments
                let coursesPayments = [];
                if (coursesResponse.status === 200) {
                    if (coursesResponse.data.course_Purcase_Requests) {
                        coursesPayments =
                            coursesResponse.data.course_Purcase_Requests.map(
                                (item) => ({
                                    ...item,
                                    type: "course", // Add type for course
                                })
                            );
                    }
                } else if (coursesResponse.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(coursesResponse.data);
                }

                // Process summaries payments
                let summariesPayments = [];
                if (summariesResponse.status === 200) {
                    if (summariesResponse.data.summary_Purcase_Requests) {
                        summariesPayments =
                            summariesResponse.data.summary_Purcase_Requests.map(
                                (item) => ({
                                    ...item,
                                    type: "summary", // Add type for summary
                                })
                            );
                    }
                } else if (summariesResponse.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(summariesResponse.data);
                }

                // Combine both course and summary payments and sort by createdAt
                const combinedData = [
                    ...coursesPayments,
                    ...summariesPayments,
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setData(combinedData); // Set combined and sorted data
                setFilteredData(combinedData); // Set initial filtered data
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [Navigate]);

    // Function to handle filter change
    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === "all") {
            setFilteredData(data);
        } else {
            setFilteredData(
                data.filter((item) => item.type === selectedFilter)
            );
        }
    };

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
                <div className="text-xl font-semibold text-green_b pb-6">
                    Rejected Payments
                </div>

                {/* Select dropdown for filtering */}
                <div className="py-4">
                    <label htmlFor="filter" className="mr-4 font-semibold">
                        Filter by:
                    </label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="border rounded-md p-2"
                    >
                        <option value="all">All</option>
                        <option value="course">Courses</option>
                        <option value="summary">Summaries</option>
                    </select>
                </div>

                {!filteredData || filteredData.length === 0 ? (
                    <div className="text-center font-semibold text-sm text-gray-600 pt-6">
                        No Payments found
                    </div>
                ) : (
                    <div>
                        <div className="w-full flex gap-12 justify-center py-4">
                            <div className="max-w-[300px] border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                                <div className="text-xs font-semibold pb-5 text-gray_v w-full">
                                    Total Number of Rejected Payment:
                                </div>
                                <div className="flex justify-between gap-2 mx-2 w-full">
                                    <div className="font-semibold text-2xl">
                                        {filteredData.length}
                                    </div>
                                    <div className="shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                        <MdAttachMoney className="shrink-0 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table-auto w-full mt-4 text-sm">
                            <thead>
                                <tr className="bg-gray-200 font-normal">
                                    <th className="px-4 py-2 border-l border-white rounded-tl-md">
                                        Payment Id
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Course/Payment Id
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Student Email
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Amount (Price)
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Category
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Student CPP
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Created At
                                    </th>
                                    {/* <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                        Action
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold">
                                {filteredData.map((payment) => (
                                    <tr key={payment?.id}>
                                        <td className="border px-4 py-2">
                                            {payment?.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {payment?.type === "summary"
                                                ? payment?.Summary?.id
                                                : payment?.Course?.id}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {payment?.Student?.email}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {payment?.Price} DA
                                        </td>
                                        <td className="border px-4 py-2">
                                            {payment?.type === "summary"
                                                ? "Summary"
                                                : "Course"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {payment?.CCP_number}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {formatDate(payment?.createdAt)}
                                        </td>
                                        {/* <td className="border px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    Navigate(
                                                        `/Payment/${payment?.id}`
                                                    );
                                                }}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                View
                                            </button>
                                        </td> */}
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

export default Rejected_Payments;
