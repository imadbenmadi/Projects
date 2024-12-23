import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import { IoIosWarning } from "react-icons/io";
import { FaGraduationCap, FaFileAlt } from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import StudentCoursesCard from "./CourseCard";

const Purchased = () => {
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageData, setPageData] = useState({});
    const [ccpNumber, setCcpNumber] = useState("");
    const [ccpNumberChanged, setCcpNumberChanged] = useState(false);
    const [changeCcpLoading, setChangeCcpLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [summaries, setSummaires] = useState([]);
    useEffect(() => {
        const fetchPurchased = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Teachers/${user.id}/Payments`,
                    { withCredentials: true, validateStatus: () => true }
                );
                if (response.status === 200) {
                    setPageData(response.data);
                    setCcpNumber(response.data.CCP_number);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchased();
    }, [user.id]);

    const changeCcp = async () => {
        setChangeCcpLoading(true);
        try {
            const response = await axios.post(
                `https://api.flexedu-dz.com/Teachers/${user.id}/CCP`,
                { CCP_number: ccpNumber },
                { withCredentials: true, validateStatus: () => true }
            );
            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "CCP number changed successfully",
                    "success"
                );
                setCcpNumberChanged(false);
            } else {
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        } finally {
            setChangeCcpLoading(false);
        }
    };
    useEffect(() => {
        axios
            .get(
                `https://api.flexedu-dz.com/Teachers/${user?.id}/CoursesWithStudentCount`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            )
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                // _____
            });

        axios
            .get(
                `https://api.flexedu-dz.com/Teachers/${user?.id}/SummariesWithStudentCount`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            )
            .then((response) => {
                setSummaires(response.data);
            })
            .catch((error) => {
                // _____
            });
    }, [user?.id]);
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
                {error.message}
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-indigo-700 mb-8">
                    Your Purchases
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        CCP Information
                    </h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={ccpNumber}
                            onChange={(e) => {
                                setCcpNumber(e.target.value);
                                setCcpNumberChanged(true);
                            }}
                            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter CCP number"
                        />
                        <button
                            onClick={() => {
                                if (!ccpNumber) {
                                    Swal.fire(
                                        "Error",
                                        "CCP number is required",
                                        "error"
                                    );
                                } else if (!/^\d+\/\d{2}$/.test(ccpNumber)) {
                                    Swal.fire(
                                        "Error",

                                        "CCP number must be in 'xxxxx/xx' format",
                                        "error"
                                    );
                                } else changeCcp();
                            }}
                            className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ${
                                ccpNumberChanged
                                    ? "opacity-100"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!ccpNumberChanged || changeCcpLoading}
                        >
                            {changeCcpLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
                        <div className="flex-shrink-0 mr-4">
                            <div className="bg-indigo-100 rounded-full p-3">
                                <FaGraduationCap className="text-3xl text-indigo-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Courses Purchased
                            </h3>
                            <p className="text-3xl font-bold text-indigo-600">
                                {pageData.course_Purcase_Requests?.length || 0}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
                        <div className="flex-shrink-0 mr-4">
                            <div className="bg-green-100 rounded-full p-3">
                                <FaFileAlt className="text-3xl text-green-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Summaries Purchased
                            </h3>
                            <p className="text-3xl font-bold text-green-600">
                                {pageData.summary_Purcase_Requests?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                        Purchased Courses
                    </h2>
                    {courses?.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center text-gray-500">
                            <IoIosWarning className="mr-2 text-2xl" />
                            <span>No courses purchased yet</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pageData.course_Purcase_Requests?.map((course) => (
                                <StudentCoursesCard
                                    key={course?.id}
                                    course={course}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                        Purchased Summaries
                    </h2>
                    {summaries?.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center text-gray-500">
                            <IoIosWarning className="mr-2 text-2xl" />
                            <span>No summaries purchased yet</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pageData.summary_Purcase_Requests?.map(
                                (summary) => (
                                    <SummaryCard
                                        key={summary.id}
                                        summary={summary.Summary}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Purchased;
